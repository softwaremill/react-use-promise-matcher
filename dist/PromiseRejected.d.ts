import { PromiseMatcher, PromiseResultShape } from "./types";
export declare class PromiseRejected<T, E> implements PromiseResultShape<T, E> {
    private reason;
    isIdle: boolean;
    isLoading: boolean;
    isResolved: boolean;
    isRejected: boolean;
    constructor(reason: E);
    match: <U>(matcher: PromiseMatcher<T, E, U>) => U;
    map: <U>() => PromiseResultShape<U, E>;
    mapErr: <U>(fn: (err: E) => U) => PromiseResultShape<T, U>;
    get: () => T;
    getOr: (orValue: T) => T;
}
