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
    onResolved: <U>(_: (value: T) => U) => this;
    onRejected: <U>(fn: (err: E) => U) => this;
    onLoading: <U>(_: () => U) => this;
    onIdle: <U>(_: () => U) => this;
}
export declare const isPromiseRejected: <T, E>(promiseResultShape: PromiseResultShape<T, E>) => promiseResultShape is PromiseRejected<T, E>;
