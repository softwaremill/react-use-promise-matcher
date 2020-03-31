import { PromiseMatcher, PromiseResultShape } from "./types";
import { PromiseIdle } from "./PromiseIdle";

describe("PromiseIdle", () => {
    const IDLE_TEXT = "Idle";

    const matcher: PromiseMatcher<unknown, unknown, string> = {
        Idle: () => IDLE_TEXT,
        Loading: () => "idle",
        Rejected: () => "rejected",
        Resolved: (_) => "resolved",
    };

    it("isIdle on PromiseIdle should be true", () => {
        const { isIdle, isLoading, isRejected, isResolved } = new PromiseIdle();
        expect(isIdle).toBe(true);
        expect(isLoading).toBe(false);
        expect(isRejected).toBe(false);
        expect(isResolved).toBe(false);
    });

    it("calling match on PromiseIdle with provided matcher should return 'Idle' text", () =>
        expect(new PromiseIdle().match(matcher)).toBe(IDLE_TEXT));

    it("calling map on PromiseIdle with provided mapper should return new PromiseIdle instance", () => {
        const original: PromiseResultShape<number, Error> = new PromiseIdle<number, Error>();
        const mapped: PromiseResultShape<string, Error> = original.map<string>((n) => `${n}`);
        expect(original).toBeInstanceOf(PromiseIdle);
        expect(mapped).toBeInstanceOf(PromiseIdle);
    });

    it("calling mapErr on PromiseIdle with provided mapper should return new PromiseIdle instance", () => {
        const original: PromiseResultShape<number, Error> = new PromiseIdle<number, Error>();
        const mapped: PromiseResultShape<number, string> = original.mapErr<string>((err) => err.message);
        expect(original).toBeInstanceOf(PromiseIdle);
        expect(mapped).toBeInstanceOf(PromiseIdle);
    });

    it("calling get on PromiseIdle should throw an Error", () =>
        expect(() => new PromiseIdle().get()).toThrow(new Error("Cannot get the value while the Promise is idle")));

    it("calling getOr on PromiseIdle should return 'some alternative' text", () => {
        const alternativeText = "some alternative";
        expect(new PromiseIdle<string, Error>().getOr(alternativeText)).toBe(alternativeText);
    });
});
