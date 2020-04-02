import { PromiseRejected } from "./PromiseRejected";
import { PromiseMatcher, PromiseResultShape } from "./types";

describe("PromiseRejected", () => {
    const REJECTION_REASON = "rejection reason";
    const REJECTED = "rejected";

    const matcher: PromiseMatcher<unknown, Error, string> = {
        Idle: () => "idle",
        Loading: () => "loading",
        Rejected: () => REJECTED,
        Resolved: () => "resolved",
    };

    it("isRejected on PromiseRejected should be true", () => {
        const { isIdle, isLoading, isRejected, isResolved } = new PromiseRejected(REJECTION_REASON);
        expect(isIdle).toBe(false);
        expect(isLoading).toBe(false);
        expect(isRejected).toBe(true);
        expect(isResolved).toBe(false);
    });

    it("calling match on PromiseRejected with provided matcher should return 'rejected' text", () =>
        expect(new PromiseRejected(new Error(REJECTION_REASON)).match(matcher)).toBe(REJECTED));

    it("calling map on PromiseRejected with provided mapper should return new PromiseRejected instance", () => {
        const original: PromiseResultShape<number, Error> = new PromiseRejected<number, Error>(
            new Error(REJECTION_REASON),
        );
        const mapped: PromiseResultShape<string, Error> = original.map<string>((n) => `${n}`);
        expect(original).toBeInstanceOf(PromiseRejected);
        expect(mapped).toBeInstanceOf(PromiseRejected);
    });

    it("calling get on PromiseRejected should throw an Error", () =>
        expect(() => new PromiseRejected(new Error(REJECTION_REASON)).get()).toThrow(new Error(REJECTION_REASON)));

    it("calling mapErr on PromiseRejected with provided mapper should map error and mapped error should be thrown when get called", () => {
        const original: PromiseResultShape<number, Error> = new PromiseRejected<number, Error>(
            new Error(REJECTION_REASON),
        );
        const mapError = (err: Error) => `${err.message} was mapped`;
        const mapped: PromiseResultShape<number, string> = original.mapErr<string>(mapError);
        expect(original).toBeInstanceOf(PromiseRejected);
        expect(mapped).toBeInstanceOf(PromiseRejected);
        expect(() => mapped.get()).toThrow(`${REJECTION_REASON} was mapped`);
    });

    it("calling getOr on PromiseRejected should return 'some alternative' text", () => {
        const alternativeText = "some alternative";
        expect(new PromiseRejected<string, string>(REJECTION_REASON).getOr(alternativeText)).toBe(alternativeText);
    });
});
