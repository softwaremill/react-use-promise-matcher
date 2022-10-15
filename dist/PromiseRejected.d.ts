import { PromiseMatcher, PromiseResultShape } from "./types";
export declare class PromiseRejected<T, E> implements PromiseResultShape<T, E> {
    reason: E;
    isIdle: boolean;
    isLoading: boolean;
    isResolved: boolean;
    isRejected: boolean;
    constructor(reason: E);
    match: <U>(matcher: PromiseMatcher<T, E, U>) => U;
    map: <U>() => PromiseResultShape<U, E>;
    flatMap: <U>() => PromiseResultShape<U, E>;
    mapErr: <U>(fn: (err: E) => U) => PromiseResultShape<T, U>;
    get: () => T;
    getOr: (orValue: T) => T;
    onResolved: (_: (value: T) => unknown) => this;
    onRejected: (fn: (err: E) => unknown) => this;
    onLoading: (_: () => unknown) => this;
    onIdle: (_: () => unknown) => this;
}
export declare const isPromiseRejected: <T, E>(promiseResultShape: PromiseResultShape<T, E>) => promiseResultShape is PromiseRejected<T, E>;
