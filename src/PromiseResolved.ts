import { PromiseMatcher, PromiseResultShape } from "./types";

export class PromiseResolved<T, E> implements PromiseResultShape<T, E> {
    public isIdle = false;
    public isLoading = false;
    public isResolved = true;
    public isRejected = false;

    constructor(public value: T) {}

    public match = <U>(matcher: PromiseMatcher<T, E, U>): U => matcher.Resolved(this.value);

    public map = <U>(fn: (value: T) => U): PromiseResultShape<U, E> => new PromiseResolved<U, E>(fn(this.value));

    public flatMap = <U>(fn: (value: T) => PromiseResultShape<U, E>): PromiseResultShape<U, E> => fn(this.value);

    public mapErr = <U>(): PromiseResultShape<T, U> => new PromiseResolved<T, U>(this.value);

    public get = (): T => {
        return this.value;
    };

    public getOr = (): T => this.get();

    public onResolved = <U>(fn: (value: T) => U) => {
        fn(this.get());
        return this;
    };

    public onRejected = <U>(_: (err: E) => U) => {
        return this;
    };

    public onLoading = <U>(_: () => U) => {
        return this;
    };

    public onIdle = <U>(_: () => U) => {
        return this;
    };
}

export const isPromiseResolved = <T, E>(
    promiseResultShape: PromiseResultShape<T, E>,
): promiseResultShape is PromiseResolved<T, E> => promiseResultShape.isResolved;
