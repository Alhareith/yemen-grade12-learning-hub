import { describe, expect, it } from "vitest";
import { appRouteHash, parseAppHash } from "@/app/routing";
import { homeActionHref, homeTrainingFallback } from "./home-actions";

describe("Stage 5.5 Home route semantics", () => {
  it("maps Home actions to canonical application routes", () => {
    expect(homeActionHref.curriculum).toBe(appRouteHash.curriculum);
    expect(homeActionHref.prompts).toBe(appRouteHash.prompts);
    expect(homeActionHref.resources).toBe(appRouteHash.resources);
    expect(homeActionHref.simulation).toBe(appRouteHash["exam-pilot"]);
  });

  it("keeps Training on the Stage 4 no-context fallback", () => {
    expect(homeTrainingFallback).toBe("curriculum");
    expect(homeActionHref.practice).toBe(appRouteHash.curriculum);
    expect(parseAppHash(homeActionHref.practice)).toBe("curriculum");
  });

  it("does not invent a generic Practice route or sixth primary route", () => {
    expect(homeActionHref.practice).not.toBe("#practice");
    expect(parseAppHash(homeActionHref.simulation)).toBe("exam-pilot");
  });
});
