import { PromiseLoading } from "./PromiseLoading";
import { PromiseMatcher, PromiseResultShape } from "./types";

describe("PromiseLoading", () => {
    const LOADING_TEXT = "Loading...";

    const matcher: PromiseMatcher<unknown, unknown, string> = {
        Idle: () => "idle",
        Loading: () => LOADING_TEXT,
        Rejected: () => "rejected",
        Resolved: (_) => "resolved",
    };

    it("isLoading on PromiseLoading should be true", () => {
        const { isIdle, isLoading, isRejected, isResolved } = new PromiseLoading();
        expect(isIdle).toBe(false);
        expect(isLoading).toBe(true);
        expect(isRejected).toBe(false);
        expect(isResolved).toBe(false);
    });

    it("calling match on PromiseLoading with provided matcher should return 'Loading...' text", () =>
        expect(new PromiseLoading().match(matcher)).toBe(LOADING_TEXT));

    it("calling map on PromiseLoading with provided mapper should return new PromiseLoading instance", () => {
        const original: PromiseResultShape<number, Error> = new PromiseLoading<number, Error>();
        const mapped: PromiseResultShape<string, Error> = original.map<string>((n) => `${n}`);
        expect(original).toBeInstanceOf(PromiseLoading);
        expect(mapped).toBeInstanceOf(PromiseLoading);
    });

    it("calling mapErr on PromiseLoading with provided mapper should return new PromiseLoading instance", () => {
        const original: PromiseResultShape<number, Error> = new PromiseLoading<number, Error>();
        const mapped: PromiseResultShape<number, string> = original.mapErr<string>((err) => err.message);
        expect(original).toBeInstanceOf(PromiseLoading);
        expect(mapped).toBeInstanceOf(PromiseLoading);
    });

    it("calling get on PromiseLoading should throw an Error", () =>
        expect(() => new PromiseLoading().get()).toThrow(
            new Error("Cannot get the value while the Promise is loading"),
        ));

    it("calling getOr on PromiseLoading should return 'some alternative' text", () => {
        const alternativeText = "some alternative";
        expect(new PromiseLoading<string, Error>().getOr(alternativeText)).toBe(alternativeText);
    });
});
