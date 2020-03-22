import { PromiseMatcher, PromiseResultShape } from "./types";

export class PromiseResolved<T, E> implements PromiseResultShape<T, E> {
    public isLoading = false;
    public isResolved = true;
    public isRejected = false;

    constructor(private value: T) {}

    public match = <U>(matcher: PromiseMatcher<T, E, U>): U => matcher.Resolved(this.value);

    public map = <U>(fn: (value: T) => U): PromiseResultShape<U, E> => new PromiseResolved<U, E>(fn(this.value));

    public mapErr = <U>(): PromiseResultShape<T, U> => new PromiseResolved<T, U>(this.value);

    public get = (): T => {
        return this.value;
    };

    public getOr = (): T => this.get();
}
