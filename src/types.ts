export interface PromiseMatcher<T, E, U> {
    Resolved: (value: T) => U;
    Rejected: (reason: E) => U;
    Loading: () => U;
    Idle?: () => U;
}

export interface PromiseResultShape<T, E> {
    match: <U>(matcher: PromiseMatcher<T, E, U>) => U;
    map: <U>(fn: (value: T) => U) => PromiseResultShape<U, E>;
    mapErr: <U>(fn: (err: E) => U) => PromiseResultShape<T, U>;
    get: () => T;
    getOr: (orValue: T) => T;
    isIdle: boolean;
    isLoading: boolean;
    isResolved: boolean;
    isRejected: boolean;
}

export type PromiseLoader<T> = () => Promise<T>;
export type UsePromise<T, E = string> = [PromiseResultShape<T, E>, PromiseLoader<void>, () => void];

export type PromiseLoaderWithArguments<T, P> = (params: P) => Promise<T>;
export type UsePromiseWithArguments<T, P, E = string> = [
    PromiseResultShape<T, E>,
    PromiseLoaderWithArguments<void, P>,
    () => void,
];

export interface UsePromiseConfig {
    autoLoad: boolean;
}
