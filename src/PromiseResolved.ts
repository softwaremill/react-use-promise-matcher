import { PromiseMatcher, PromiseResultShape } from "./types";

export class PromiseResolved<T, E> implements PromiseResultShape<T, E> {
    public isIdle = false;
    public isLoading = false;
    public isResolved = true;
    public isRejected = false;

    constructor(public value: T) {}

    public match = <U>(matcher: PromiseMatcher<T, E, U>): U => matcher.Resolved(this.value);

    public map = <U>(fn: (value: T) => U): PromiseResultShape<U, E> => new PromiseResolved<U, E>(fn(this.value));

    public mapErr = <U>(): PromiseResultShape<T, U> => new PromiseResolved<T, U>(this.value);

    public get = (): T => {
        return this.value;
    };

    public getOr = (): T => this.get();
}

export const isPromiseResolved = <T, E>(
    promiseResultShape: PromiseResultShape<T, E>,
): promiseResultShape is PromiseResolved<T, E> => promiseResultShape.isResolved;
