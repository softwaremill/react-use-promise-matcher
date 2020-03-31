import { PromiseResolved } from "./PromiseResolved";
import { PromiseMatcher, PromiseResultShape } from "./types";

interface TestInterface {
    value: string;
}

describe("PromiseResolved", () => {
    const RESOLVED_VALUE = "resolved value";
    const RESOLVED_OBJECT: TestInterface = {
        value: RESOLVED_VALUE,
    };

    const matcher: PromiseMatcher<TestInterface, unknown, string> = {
        Idle: () => "idle",
        Loading: () => "loading",
        Rejected: () => "rejected",
        Resolved: (obj) => obj.value,
    };

    it("isResolved on PromiseResolved should be true", () => {
        const { isIdle, isLoading, isRejected, isResolved } = new PromiseResolved(RESOLVED_OBJECT);
        expect(isIdle).toBe(false);
        expect(isLoading).toBe(false);
        expect(isRejected).toBe(false);
        expect(isResolved).toBe(true);
    });

    it("calling match on PromiseResolved with provided matcher should return 'resolved value' text", () =>
        expect(new PromiseResolved(RESOLVED_OBJECT).match(matcher)).toBe(RESOLVED_VALUE));

    it("calling map on PromiseResolved with provided mapper should return new PromiseResolved instance with mapped value", () => {
        const original: PromiseResultShape<TestInterface, Error> = new PromiseResolved<TestInterface, Error>(
            RESOLVED_OBJECT,
        );
        const mapped: PromiseResultShape<string, Error> = original.map<string>((obj) => `${obj.value} was mapped`);
        expect(original).toBeInstanceOf(PromiseResolved);
        expect(mapped).toBeInstanceOf(PromiseResolved);
        expect(mapped.get()).toBe(`${RESOLVED_OBJECT.value} was mapped`);
    });

    it("calling mapErr on PromiseResolved with provided mapper should return new PromiseResolved instance", () => {
        const original: PromiseResultShape<TestInterface, Error> = new PromiseResolved<TestInterface, Error>(
            RESOLVED_OBJECT,
        );
        const mapped: PromiseResultShape<TestInterface, string> = original.mapErr<string>((err) => err.message);
        expect(original).toBeInstanceOf(PromiseResolved);
        expect(mapped).toBeInstanceOf(PromiseResolved);
    });

    it("calling get on PromiseResolved should return value", () =>
        expect(new PromiseResolved(RESOLVED_OBJECT).get()).toBe(RESOLVED_OBJECT));

    it("calling getOr on PromiseResolved should return value", () => {
        const alternativeText = "some alternative";
        const promiseResolved: PromiseResultShape<string, Error> = new PromiseResolved<string, Error>(RESOLVED_VALUE);
        expect(promiseResolved.getOr(alternativeText)).toBe(RESOLVED_VALUE);
    });
});
