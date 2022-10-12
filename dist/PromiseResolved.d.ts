import { PromiseMatcher, PromiseResultShape } from "./types";
export declare class PromiseResolved<T, E> implements PromiseResultShape<T, E> {
    value: T;
    isIdle: boolean;
    isLoading: boolean;
    isResolved: boolean;
    isRejected: boolean;
    constructor(value: T);
    match: <U>(matcher: PromiseMatcher<T, E, U>) => U;
    map: <U>(fn: (value: T) => U) => PromiseResultShape<U, E>;
    flatMap: <U>(fn: (value: T) => PromiseResultShape<U, E>) => PromiseResultShape<U, E>;
    mapErr: <U>() => PromiseResultShape<T, U>;
    get: () => T;
    getOr: () => T;
    onResolved: (fn: (value: T) => unknown) => this;
    onRejected: (_: (err: E) => unknown) => this;
    onLoading: (_: () => unknown) => this;
    onIdle: (_: () => unknown) => this;
}
export declare const isPromiseResolved: <T, E>(promiseResultShape: PromiseResultShape<T, E>) => promiseResultShape is PromiseResolved<T, E>;
