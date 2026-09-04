type TokenKind = "number" | "ident" | "symbol" | "arabic";

type Token = {
  kind: TokenKind;
  value: string;
};

type MathNode =
  | { kind: "number"; value: string }
  | { kind: "identifier"; value: string; word?: boolean }
  | { kind: "operator"; value: string }
  | { kind: "row"; children: MathNode[] }
  | { kind: "fraction"; numerator: MathNode; denominator: MathNode }
  | { kind: "sup"; base: MathNode; exponent: MathNode }
  | { kind: "sub"; base: MathNode; subscript: MathNode }
  | { kind: "subsup"; base: MathNode; subscript: MathNode; superscript: MathNode }
  | { kind: "root"; body: MathNode }
  | { kind: "fenced"; open: string; close: string; body: MathNode }
  | { kind: "absolute"; body: MathNode }
  | { kind: "under"; base: MathNode; under: MathNode }
  | { kind: "integral"; lower?: MathNode; upper?: MathNode; body?: MathNode; differential?: MathNode }
  | { kind: "text"; value: string };

const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"] as const;

const IDENTIFIERS: Record<string, string> = {
  x: "س",
  y: "ص",
  f: "د",
  g: "ر",
  u: "ع",
  v: "ل",
  a: "أ",
  b: "ب",
  c: "ج",
  n: "ن",
  k: "ك",
  e: "هـ",
  C: "ث",
  d: "د",
  dx: "دس",
  dy: "دص",
  du: "دع",
  dv: "دل",
};

const FUNCTIONS: Record<string, string> = {
  sin: "جا",
  cos: "جتا",
  tan: "ظا",
  cot: "ظتا",
  sec: "قا",
  csc: "قتا",
  ln: "لو",
  log: "لو",
};

const RELATIONS = new Set(["=", "≠", "≤", "≥", "<", ">", "∈", "→"]);

export function toArabicDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) => ARABIC_DIGITS[Number(digit)] ?? digit);
}

export function localizeArabicText(value: string): string {
  return toArabicDigits(value)
    .replace(/\bMath\b/g, "رياضيات")
    .replace(/,/g, "،");
}

export function arabicMathPlainText(source: string): string {
  const tokens = tokenize(source);
  let output = "";
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.kind === "number") {
      output += localizeNumber(token.value);
    } else if (token.kind === "ident") {
      if (token.value === "lim") output += "نها";
      else if (FUNCTIONS[token.value]) output += FUNCTIONS[token.value];
      else output += IDENTIFIERS[token.value] ?? token.value;
    } else if (token.value === "π") {
      output += "ط";
    } else if (token.value === "→") {
      output += "←";
    } else if (token.value === ",") {
      output += "،";
    } else if (token.value === "...") {
      output += "…";
    } else if (token.value === "-") {
      output += "−";
    } else {
      output += token.value;
    }
  }
  return output;
}

export function renderArabicMathML(source: string, display: "inline" | "block" = "inline"): string {
  const node = parseAll(tokenize(source));
  const body = toMathML(node);
  const mode = display === "block" ? "block" : "inline";
  return `<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl" display="${mode}" aria-label="${escapeXml(arabicMathPlainText(source))}">${body}</math>`;
}

export function collectArabicMathDiagnostics(source: string): string[] {
  try {
    parseAll(tokenize(source));
    return [];
  } catch (error) {
    return [error instanceof Error ? error.message : "unknown-math-error"];
  }
}

class Parser {
  private index = 0;

  constructor(private readonly tokens: Token[]) {}

  position(): number {
    return this.index;
  }

  atEnd(): boolean {
    return this.index >= this.tokens.length;
  }

  remaining(): Token[] {
    return this.tokens.slice(this.index);
  }

  parseExpression(): MathNode {
    if (this.tokens.length === 0) return textNode("");
    return this.parseSequence();
  }

  private parseSequence(): MathNode {
    let left = this.parseRelation();
    while (this.match(",")) {
      const right = this.parseRelation();
      left = row(left, operator("،"), right);
    }
    return left;
  }

  private parseRelation(): MathNode {
    let left = this.parseAdditive();
    while (this.matchRelation()) {
      const relation = this.previous().value === "→" ? "←" : this.previous().value;
      const right = this.parseAdditive();
      left = row(left, operator(relation), right);
    }
    return left;
  }

  private parseAdditive(): MathNode {
    let left = this.parseProduct();
    while (this.match("+") || this.match("-")) {
      const op = this.previous().value;
      const right = this.parseProduct();
      left = row(left, operator(op === "-" ? "−" : op), right);
    }
    return left;
  }

  private parseProduct(): MathNode {
    let left = this.parsePower();
    while (!this.atEnd()) {
      if (this.match("/")) {
        left = { kind: "fraction", numerator: left, denominator: this.parsePower() };
        continue;
      }
      if (this.match("×") || this.match("*")) {
        left = row(left, operator("×"), this.parsePower());
        continue;
      }
      const next = this.peek();
      if (next && startsPrimary(next)) {
        left = row(left, this.parsePower());
        continue;
      }
      break;
    }
    return left;
  }

  private parsePower(): MathNode {
    let base = this.parseUnary();

    while (this.match("'")) {
      let primeCount = 1;
      while (this.match("'")) primeCount += 1;
      base = { kind: "sup", base, exponent: operator(primeCount === 1 ? "′" : primeCount === 2 ? "″" : "‴") };
    }

    let subscript: MathNode | undefined;
    let superscript: MathNode | undefined;
    let readingScripts = true;
    while (readingScripts) {
      if (!subscript && this.match("_")) {
        subscript = this.parseScriptValue();
      } else if (!superscript && this.match("^")) {
        superscript = this.parseScriptValue();
      } else {
        readingScripts = false;
      }
    }

    if (subscript && superscript) return { kind: "subsup", base, subscript, superscript };
    if (subscript) return { kind: "sub", base, subscript };
    if (superscript) return { kind: "sup", base, exponent: superscript };
    return base;
  }

  private parseUnary(): MathNode {
    if (this.match("-")) return row(operator("−"), this.parseUnary());
    if (this.match("+")) return row(operator("+"), this.parseUnary());
    if (this.match("±")) return row(operator("±"), this.parseUnary());
    if (this.match("√")) return { kind: "root", body: this.parseUnary() };
    return this.parsePrimary();
  }

  private parsePrimary(): MathNode {
    const token = this.advance();
    if (!token) return textNode("");

    if (token.kind === "number") return { kind: "number", value: localizeNumber(token.value) };
    if (token.kind === "arabic") return { kind: "text", value: localizeArabicText(token.value) };

    if (token.kind === "ident") {
      if (token.value === "lim") return this.parseLimit();
      const functionName = FUNCTIONS[token.value];
      if (functionName) return { kind: "identifier", value: functionName, word: true };
      return { kind: "identifier", value: IDENTIFIERS[token.value] ?? token.value };
    }

    if (token.value === "π") return { kind: "identifier", value: "ط" };
    if (token.value === "∞") return operator("∞");
    if (token.value === "Σ") return operator("∑");
    if (token.value === "...") return operator("…");
    if (token.value === "∫") return this.parseIntegral();

    if (token.value === "(") return this.parseFence(")", "(", ")");
    if (token.value === "[") return this.parseFence("]", "[", "]");
    if (token.value === "{") return this.parseFence("}", "{", "}");
    if (token.value === "|") return this.parseAbsolute();
    if (token.value === ",") return operator("،");
    if (token.value === "→") return operator("←");

    return operator(normalizeOperator(token.value));
  }

  private parseFence(expectedClose: string, open: string, close: string): MathNode {
    const innerTokens = this.consumeUntilMatching(expectedClose);
    return { kind: "fenced", open, close, body: parseAll(innerTokens) };
  }

  private parseAbsolute(): MathNode {
    const inner: Token[] = [];
    while (!this.atEnd() && this.peek()?.value !== "|") inner.push(this.advance()!);
    if (!this.match("|")) throw new Error("unclosed:absolute-value");
    return { kind: "absolute", body: parseAll(inner) };
  }

  private parseLimit(): MathNode {
    let condition: MathNode | undefined;
    if (this.match("_")) condition = this.parseScriptValue();
    const base: MathNode = { kind: "identifier", value: "نها", word: true };
    return condition ? { kind: "under", base, under: condition } : base;
  }

  private parseIntegral(): MathNode {
    let lower: MathNode | undefined;
    let upper: MathNode | undefined;
    if (this.match("_")) lower = this.parseScriptValue();
    if (this.match("^")) upper = this.parseScriptValue();

    const differentialIndex = this.findDifferentialIndex();
    if (differentialIndex < 0) return { kind: "integral", lower, upper };

    const differentialToken = this.tokens[differentialIndex];

    if (differentialIndex === this.index && this.tokens[differentialIndex + 1]?.value === "/") {
      const denominatorStart = differentialIndex + 2;
      const denominatorEnd = this.findTopLevelStop(denominatorStart);
      const denominator = parseAll(this.tokens.slice(denominatorStart, denominatorEnd));
      this.index = denominatorEnd;
      return {
        kind: "integral",
        lower,
        upper,
        body: { kind: "fraction", numerator: { kind: "number", value: "١" }, denominator },
        differential: identifierNode(IDENTIFIERS[differentialToken.value] ?? differentialToken.value),
      };
    }

    const bodyTokens = this.tokens.slice(this.index, differentialIndex);
    const body = parseAll(bodyTokens);
    this.index = differentialIndex + 1;
    return {
      kind: "integral",
      lower,
      upper,
      body,
      differential: identifierNode(IDENTIFIERS[differentialToken.value] ?? differentialToken.value),
    };
  }

  private findDifferentialIndex(): number {
    let depth = 0;
    for (let index = this.index; index < this.tokens.length; index += 1) {
      const token = this.tokens[index];
      if (["(", "[", "{"].includes(token.value)) depth += 1;
      if ([")", "]", "}"].includes(token.value)) depth -= 1;
      if (depth === 0 && token.kind === "ident" && /^(dx|dy|du|dv)$/.test(token.value)) return index;
      if (depth === 0 && RELATIONS.has(token.value)) return -1;
    }
    return -1;
  }

  private findTopLevelStop(start: number): number {
    let depth = 0;
    for (let index = start; index < this.tokens.length; index += 1) {
      const value = this.tokens[index].value;
      if (["(", "[", "{"].includes(value)) depth += 1;
      if ([")", "]", "}"].includes(value)) depth -= 1;
      if (depth === 0 && RELATIONS.has(value)) return index;
    }
    return this.tokens.length;
  }

  private parseScriptValue(): MathNode {
    if (this.match("{")) return parseAll(this.consumeUntilMatching("}"));
    if (this.match("(")) return parseAll(this.consumeUntilMatching(")"));
    return this.parseUnary();
  }

  private consumeUntilMatching(close: string): Token[] {
    const output: Token[] = [];
    let depth = 0;
    const openForClose: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
    const open = openForClose[close];

    while (!this.atEnd()) {
      const token = this.advance()!;
      if (token.value === open) depth += 1;
      if (token.value === close) {
        if (depth === 0) return output;
        depth -= 1;
      }
      output.push(token);
    }
    throw new Error(`unclosed:${open}`);
  }

  private match(value: string): boolean {
    if (this.peek()?.value !== value) return false;
    this.index += 1;
    return true;
  }

  private matchRelation(): boolean {
    const value = this.peek()?.value;
    if (!value || !RELATIONS.has(value)) return false;
    this.index += 1;
    return true;
  }

  private advance(): Token | undefined {
    if (this.atEnd()) return undefined;
    const token = this.tokens[this.index];
    this.index += 1;
    return token;
  }

  private peek(): Token | undefined {
    return this.tokens[this.index];
  }

  private previous(): Token {
    return this.tokens[this.index - 1];
  }
}

function parseAll(tokens: Token[]): MathNode {
  if (tokens.length === 0) return textNode("");
  const parser = new Parser(tokens);
  const node = parser.parseExpression();
  if (!parser.atEnd()) {
    throw new Error(`unparsed:${parser.remaining().map((token) => token.value).join("")}`);
  }
  return node;
}

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  while (index < source.length) {
    const char = source[index];
    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    if (source.slice(index, index + 3) === "...") {
      tokens.push({ kind: "symbol", value: "..." });
      index += 3;
      continue;
    }

    if (/[0-9]/.test(char)) {
      let value = char;
      index += 1;
      while (index < source.length && /[0-9.]/.test(source[index])) {
        value += source[index];
        index += 1;
      }
      tokens.push({ kind: "number", value });
      continue;
    }

    if (/[A-Za-z]/.test(char)) {
      let value = char;
      index += 1;
      while (index < source.length && /[A-Za-z]/.test(source[index])) {
        value += source[index];
        index += 1;
      }
      tokens.push({ kind: "ident", value });
      continue;
    }

    if (/[\u0600-\u06FF]/.test(char) && char !== "،") {
      let value = char;
      index += 1;
      while (index < source.length && /[\u0600-\u06FF\s]/.test(source[index]) && source[index] !== "،") {
        value += source[index];
        index += 1;
      }
      tokens.push({ kind: "arabic", value: value.trim() });
      continue;
    }

    tokens.push({ kind: "symbol", value: char === "−" ? "-" : char });
    index += 1;
  }

  return tokens;
}

function startsPrimary(token: Token): boolean {
  if (token.kind === "number" || token.kind === "ident" || token.kind === "arabic") return true;
  return ["(", "[", "{", "|", "√", "∫", "Σ", "π", "∞"].includes(token.value);
}

function normalizeOperator(value: string): string {
  if (value === "-") return "−";
  if (value === ",") return "،";
  return value;
}

function localizeNumber(value: string): string {
  return toArabicDigits(value).replace(/\./g, "٫");
}

function identifierNode(value: string, word = false): MathNode {
  return { kind: "identifier", value, word };
}

function operator(value: string): MathNode {
  return { kind: "operator", value };
}

function textNode(value: string): MathNode {
  return { kind: "text", value };
}

function row(...nodes: MathNode[]): MathNode {
  const children: MathNode[] = [];
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    if (node.kind === "row") children.push(...node.children);
    else children.push(node);
  }
  return { kind: "row", children };
}

function toMathML(node: MathNode): string {
  switch (node.kind) {
    case "number":
      return `<mn>${escapeXml(node.value)}</mn>`;
    case "identifier":
      return node.word
        ? `<mtext class="arabic-math-word">${escapeXml(node.value)}</mtext>`
        : `<mi mathvariant="normal">${escapeXml(node.value)}</mi>`;
    case "operator":
      return `<mo>${escapeXml(node.value)}</mo>`;
    case "text":
      return `<mtext>${escapeXml(node.value)}</mtext>`;
    case "row":
      return `<mrow>${node.children.map(toMathML).join("")}</mrow>`;
    case "fraction":
      return `<mfrac>${toMathML(node.numerator)}${toMathML(node.denominator)}</mfrac>`;
    case "sup":
      return `<msup>${toMathML(node.base)}${toMathML(node.exponent)}</msup>`;
    case "sub":
      return `<msub>${toMathML(node.base)}${toMathML(node.subscript)}</msub>`;
    case "subsup":
      return `<msubsup>${toMathML(node.base)}${toMathML(node.subscript)}${toMathML(node.superscript)}</msubsup>`;
    case "root":
      return `<msqrt>${toMathML(node.body)}</msqrt>`;
    case "fenced":
      return `<mrow><mo fence="true">${escapeXml(node.open)}</mo>${toMathML(node.body)}<mo fence="true">${escapeXml(node.close)}</mo></mrow>`;
    case "absolute":
      return `<mrow><mo fence="true">|</mo>${toMathML(node.body)}<mo fence="true">|</mo></mrow>`;
    case "under":
      return `<munder>${toMathML(node.base)}${toMathML(node.under)}</munder>`;
    case "integral": {
      const integral = node.lower || node.upper
        ? `<msubsup><mo largeop="true">∫</mo>${node.lower ? toMathML(node.lower) : "<mrow></mrow>"}${node.upper ? toMathML(node.upper) : "<mrow></mrow>"}</msubsup>`
        : `<mo largeop="true">∫</mo>`;
      const body = node.body ? toMathML(node.body) : "";
      const differential = node.differential ? `<mspace width="0.18em"/>${toMathML(node.differential)}` : "";
      return `<mrow>${integral}${body}${differential}</mrow>`;
    }
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
