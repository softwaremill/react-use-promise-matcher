import { PromiseMatcher, PromiseResultShape } from "./types";

export class PromiseIdle<T, E> implements PromiseResultShape<T, E> {
    public isIdle = true;
    public isLoading = false;
    public isResolved = false;
    public isRejected = false;

    public match = <U>(matcher: PromiseMatcher<T, E, U>): U => (matcher.Idle ? matcher.Idle() : matcher.Loading());

    public map = <U>(): PromiseResultShape<U, E> => new PromiseIdle<U, E>();

    public mapErr = <U>(): PromiseResultShape<T, U> => new PromiseIdle<T, U>();

    public get = (): T => {
        throw new Error("Cannot get the value while the Promise is idle");
    };

    public getOr = (orValue: T): T => orValue;
}
