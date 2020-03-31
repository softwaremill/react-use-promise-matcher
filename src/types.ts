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
export interface UsePromise<T, E = string> {
    load: PromiseLoader<void>;
    result: PromiseResultShape<T, E>;
}

export type PromiseLoaderWithArguments<T, P extends object> = (params: P) => Promise<T>;
export interface UsePromiseWithArguments<T, P extends object, E = string> {
    load: PromiseLoaderWithArguments<void, P>;
    result: PromiseResultShape<T, E>;
}

export interface UsePromiseConfig {
    autoLoad: boolean;
}
