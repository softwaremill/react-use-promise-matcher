import { PromiseResolved, isPromiseResolved } from "./PromiseResolved";
import { PromiseMatcher, PromiseResultShape } from "./types";
import { PromiseRejected } from "./PromiseRejected";
import { PromiseIdle } from "./PromiseIdle";
import { PromiseLoading } from "./PromiseLoading";

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

    it("calling isPromiseResolved on a resolved promise allows asserting PromiseResolved type and accessing the value safely", () => {
        const promiseResolved: PromiseResultShape<string, string> = new PromiseResolved<string, string>(RESOLVED_VALUE);

        if (isPromiseResolved(promiseResolved)) {
            expect(promiseResolved.value).toEqual(RESOLVED_VALUE);
        } else {
            fail("The PromiseResolved type was not correctly detected");
        }
    });

    it("calling isPromiseResolved on PromiseRejected returns false", () => {
        expect(isPromiseResolved(new PromiseRejected<string, string>("some error"))).toEqual(false);
    });

    it("calling isPromiseResolved on PromiseIdle returns false", () => {
        expect(isPromiseResolved(new PromiseIdle())).toEqual(false);
    });

    it("calling isPromiseResolved on PromiseLoading returns false", () => {
        expect(isPromiseResolved(new PromiseLoading())).toEqual(false);
    });

    it("calling flatMap on PromiseResolved with provided mapper should return new PromiseResolved instance with mapped value", () => {
        const original: PromiseResultShape<TestInterface, Error> = new PromiseResolved<TestInterface, Error>(
            RESOLVED_OBJECT,
        );
        const mapped: PromiseResultShape<string, Error> = original.flatMap<string>(
            (obj) => new PromiseResolved(`${obj.value} was mapped`),
        );
        expect(original).toBeInstanceOf(PromiseResolved);
        expect(mapped).toBeInstanceOf(PromiseResolved);
        expect(mapped.get()).toBe(`${RESOLVED_OBJECT.value} was mapped`);
    });

    it("calling flatMap on PromiseResolved with provided mapper should return new PromiseRejected instance with an error from the second promise", () => {
        const original: PromiseResultShape<TestInterface, Error> = new PromiseResolved<TestInterface, Error>(
            RESOLVED_OBJECT,
        );
        const mapped: PromiseResultShape<string, Error> = original.flatMap<string>(
            () => new PromiseRejected(new Error("some error")),
        );
        expect(original).toBeInstanceOf(PromiseResolved);
        expect(mapped).toBeInstanceOf(PromiseRejected);
        expect((mapped as PromiseRejected<string, Error>).reason.message).toBe("some error");
    });

    it("calling flatMap on PromiseResolved with provided mapper should return new PromiseLoading instance", () => {
        const original: PromiseResultShape<TestInterface, Error> = new PromiseResolved<TestInterface, Error>(
            RESOLVED_OBJECT,
        );
        const mapped: PromiseResultShape<string, Error> = original.flatMap<string>(() => new PromiseLoading());
        expect(original).toBeInstanceOf(PromiseResolved);
        expect(mapped).toBeInstanceOf(PromiseLoading);
    });

    it("calling flatMap on PromiseResolved with provided mapper should return new PromiseIdle instance", () => {
        const original: PromiseResultShape<TestInterface, Error> = new PromiseResolved<TestInterface, Error>(
            RESOLVED_OBJECT,
        );
        const mapped: PromiseResultShape<string, Error> = original.flatMap<string>(() => new PromiseIdle());
        expect(original).toBeInstanceOf(PromiseResolved);
        expect(mapped).toBeInstanceOf(PromiseIdle);
    });

    it("calling onResolved on PromiseResolved should invoke provided callback", () => {
        const callback = jest.fn();
        new PromiseResolved(RESOLVED_VALUE).onResolved(callback);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("calling onRejected on PromiseResolved should not invoke provided callback", () => {
        const callback = jest.fn();
        new PromiseResolved(RESOLVED_VALUE).onRejected(callback);
        expect(callback).not.toHaveBeenCalled();
    });

    it("calling onLoading on PromiseResolved should not invoke provided callback", () => {
        const callback = jest.fn();
        new PromiseResolved(RESOLVED_VALUE).onLoading(callback);
        expect(callback).not.toHaveBeenCalled();
    });

    it("calling onIdle on PromiseResolved should not invoke provided callback", () => {
        const callback = jest.fn();
        new PromiseResolved(RESOLVED_VALUE).onIdle(callback);
        expect(callback).not.toHaveBeenCalled();
    });
});
