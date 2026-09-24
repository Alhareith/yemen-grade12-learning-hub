import { describe, expect, it } from "vitest";
import { isProductShellRoute } from "./route-lifecycle";
import { parseAppHash } from "./routing";

describe("Stage 4 protected route boundaries", () => {
  it("keeps protected exam and design-system fixtures outside the product shell", () => {
    expect(isProductShellRoute(parseAppHash("#exam-pilot"))).toBe(false);
    expect(isProductShellRoute(parseAppHash("#design-system-preview"))).toBe(false);
    expect(isProductShellRoute(parseAppHash("#design-system-primitives"))).toBe(false);
  });

  it("keeps product routes inside the application shell", () => {
    expect(isProductShellRoute(parseAppHash(""))).toBe(true);
    expect(isProductShellRoute(parseAppHash("#curriculum"))).toBe(true);
    expect(isProductShellRoute(parseAppHash("#prompts"))).toBe(true);
    expect(isProductShellRoute(parseAppHash("#resources"))).toBe(true);
    expect(isProductShellRoute(parseAppHash("#practice/CPLX-NUMBER-USE"))).toBe(true);
  });
});
