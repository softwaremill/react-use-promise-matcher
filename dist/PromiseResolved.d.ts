import { PromiseMatcher, PromiseResultShape } from "./types";
export declare class PromiseResolved<T, E> implements PromiseResultShape<T, E> {
    private value;
    isIdle: boolean;
    isLoading: boolean;
    isResolved: boolean;
    isRejected: boolean;
    constructor(value: T);
    match: <U>(matcher: PromiseMatcher<T, E, U>) => U;
    map: <U>(fn: (value: T) => U) => PromiseResultShape<U, E>;
    mapErr: <U>() => PromiseResultShape<T, U>;
    get: () => T;
    getOr: () => T;
}
