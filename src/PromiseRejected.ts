import { PromiseMatcher, PromiseResultShape } from "./types";

export class PromiseRejected<T, E> implements PromiseResultShape<T, E> {
    public isLoading = false;
    public isResolved = false;
    public isRejected = true;
    constructor(private reason: E) {}

    public match = <U>(matcher: PromiseMatcher<T, E, U>): U => matcher.Rejected(this.reason);

    public map = <U>(): PromiseResultShape<U, E> => new PromiseRejected<U, E>(this.reason);

    public mapErr = <U>(fn: (err: E) => U): PromiseResultShape<T, U> => new PromiseRejected<T, U>(fn(this.reason));

    public get = (): T => {
        throw this.reason;
    };

    public getOr = (orValue: T): T => orValue;
}
