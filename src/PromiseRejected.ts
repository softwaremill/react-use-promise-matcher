import { PromiseMatcher, PromiseResultShape } from "./types";

export class PromiseRejected<T, E> implements PromiseResultShape<T, E> {
    public isIdle = false;
    public isLoading = false;
    public isResolved = false;
    public isRejected = true;
    constructor(public reason: E) {}

    public match = <U>(matcher: PromiseMatcher<T, E, U>): U => matcher.Rejected(this.reason);

    public map = <U>(): PromiseResultShape<U, E> => new PromiseRejected<U, E>(this.reason);

    public mapErr = <U>(fn: (err: E) => U): PromiseResultShape<T, U> => new PromiseRejected<T, U>(fn(this.reason));

    public get = (): T => {
        throw this.reason;
    };

    public getOr = (orValue: T): T => orValue;
}

export const isPromiseRejected = <T, E>(
    promiseResultShape: PromiseResultShape<T, E>,
): promiseResultShape is PromiseRejected<T, E> => promiseResultShape.isRejected;
