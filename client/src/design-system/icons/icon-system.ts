import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleHelp,
  Clipboard,
  ClipboardPaste,
  Copy,
  Dumbbell,
  Eraser,
  ExternalLink,
  FileQuestion,
  FileText,
  Flag,
  Grid2X2,
  Home,
  Layers3,
  Library,
  Menu,
  PlayCircle,
  RotateCcw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  TimerOff,
  Clock3,
  X,
  XCircle,
  type LucideIcon,
} from "lucide-react";

export const iconSize = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 24,
} as const;

export const iconStroke = {
  default: 2,
  active: 2.25,
} as const;

export type IconSize = keyof typeof iconSize;

export type IconContract = {
  icon: LucideIcon;
  size: IconSize;
  mirrorInRtl: boolean;
};

export const functionalIcons = {
  navigation: {
    home: { icon: Home, size: "md", mirrorInRtl: false },
    menu: { icon: Menu, size: "md", mirrorInRtl: false },
    back: { icon: ArrowRight, size: "sm", mirrorInRtl: false },
    forward: { icon: ChevronLeft, size: "sm", mirrorInRtl: false },
    previous: { icon: ChevronRight, size: "sm", mirrorInRtl: false },
    next: { icon: ChevronLeft, size: "sm", mirrorInRtl: false },
    expand: { icon: ChevronDown, size: "xs", mirrorInRtl: false },
    collapse: { icon: ChevronUp, size: "xs", mirrorInRtl: false },
    close: { icon: X, size: "sm", mirrorInRtl: false },
  },

  action: {
    search: { icon: Search, size: "sm", mirrorInRtl: false },
    copy: { icon: Copy, size: "xs", mirrorInRtl: false },
    copied: { icon: Check, size: "xs", mirrorInRtl: false },
    paste: { icon: ClipboardPaste, size: "xs", mirrorInRtl: false },
    clipboard: { icon: Clipboard, size: "sm", mirrorInRtl: false },
    clear: { icon: Eraser, size: "xs", mirrorInRtl: false },
    retry: { icon: RotateCcw, size: "xs", mirrorInRtl: false },
    external: { icon: ExternalLink, size: "xs", mirrorInRtl: false },
  },

  content: {
    curriculum: { icon: BookOpen, size: "md", mirrorInRtl: false },
    curriculumMap: { icon: Layers3, size: "sm", mirrorInRtl: false },
    subjects: { icon: Library, size: "md", mirrorInRtl: false },
    resources: { icon: BookOpenCheck, size: "md", mirrorInRtl: false },
    document: { icon: FileText, size: "sm", mirrorInRtl: false },
    questions: { icon: FileQuestion, size: "sm", mirrorInRtl: false },
    video: { icon: PlayCircle, size: "sm", mirrorInRtl: false },
    telegram: { icon: Send, size: "sm", mirrorInRtl: false },
    prompts: { icon: Sparkles, size: "md", mirrorInRtl: false },
    practice: { icon: Dumbbell, size: "md", mirrorInRtl: false },
    simulation: { icon: Target, size: "md", mirrorInRtl: false },
    questionGrid: { icon: Grid2X2, size: "sm", mirrorInRtl: false },
    flag: { icon: Flag, size: "sm", mirrorInRtl: false },
    timed: { icon: Clock3, size: "sm", mirrorInRtl: false },
    untimed: { icon: TimerOff, size: "sm", mirrorInRtl: false },
  },

  status: {
    success: { icon: CheckCircle2, size: "sm", mirrorInRtl: false },
    error: { icon: XCircle, size: "sm", mirrorInRtl: false },
    warning: { icon: AlertTriangle, size: "sm", mirrorInRtl: false },
    help: { icon: CircleHelp, size: "sm", mirrorInRtl: false },
    verified: { icon: ShieldCheck, size: "sm", mirrorInRtl: false },
    blocked: { icon: ShieldAlert, size: "sm", mirrorInRtl: false },
  },
} as const satisfies Record<string, Record<string, IconContract>>;

/**
 * RTL rule:
 * Direction is encoded semantically in the selected glyph.
 * Consumers must not add CSS scaleX(-1) to these icons.
 */
export const rtlIconPolicy = {
  cssMirroringAllowed: false,
  back: "ArrowRight",
  forward: "ChevronLeft",
  previous: "ChevronRight",
  next: "ChevronLeft",
} as const;
