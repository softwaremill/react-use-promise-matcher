export interface PromiseMatcher<T, E, U> {
    Resolved: (value: T) => U;
    Rejected: (reason: E) => U;
    Loading: () => U;
    Idle?: () => U;
}
export interface PromiseResultShape<T, E> {
    match: <U>(matcher: PromiseMatcher<T, E, U>) => U;
    map: <U>(fn: (value: T) => U) => PromiseResultShape<U, E>;
    flatMap: <U>(fn: (value: T) => PromiseResultShape<U, E>) => PromiseResultShape<U, E>;
    mapErr: <U>(fn: (err: E) => U) => PromiseResultShape<T, U>;
    get: () => T;
    getOr: (orValue: T) => T;
    isIdle: boolean;
    isLoading: boolean;
    isResolved: boolean;
    isRejected: boolean;
}
export declare type PromiseLoader<T, Args extends any[]> = (...args: Args) => Promise<T>;
export declare type UsePromise<T, Args extends any[], E = string> = [
    result: PromiseResultShape<T, E>,
    load: PromiseLoader<void, Args>,
    reset: () => void
];
export declare type UsePromiseWithInterval<T, E, A extends any[]> = [
    result: PromiseResultShape<T, E>,
    start: (...args: A) => void,
    stop: () => void,
    reset: () => void
];
