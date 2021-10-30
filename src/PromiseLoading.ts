import { PromiseMatcher, PromiseResultShape } from "./types";

export class PromiseLoading<T, E> implements PromiseResultShape<T, E> {
    public isIdle = false;
    public isLoading = true;
    public isResolved = false;
    public isRejected = false;

    public match = <U>(matcher: PromiseMatcher<T, E, U>): U => matcher.Loading();

    public map = <U>(): PromiseResultShape<U, E> => new PromiseLoading<U, E>();

    public flatMap = <U>(): PromiseResultShape<U, E> => new PromiseLoading<U, E>();

    public mapErr = <U>(): PromiseResultShape<T, U> => new PromiseLoading<T, U>();

    public get = (): T => {
        throw new Error("Cannot get the value while the Promise is loading");
    };

    public getOr = (orValue: T): T => orValue;

    public onResolved = (_: (value: T) => void) => {
        return this;
    };

    public onRejected = (_: (err: E) => void) => {
        return this;
    };

    public onLoading = <U>(fn: () => U) => {
        fn();
        return this;
    };

    public onIdle = <U>(_: () => U) => {
        return this;
    };
}
