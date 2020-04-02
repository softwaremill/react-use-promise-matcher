import { PromiseMatcher, PromiseResultShape } from "./types";
export declare class PromiseLoading<T, E> implements PromiseResultShape<T, E> {
    isIdle: boolean;
    isLoading: boolean;
    isResolved: boolean;
    isRejected: boolean;
    match: <U>(matcher: PromiseMatcher<T, E, U>) => U;
    map: <U>() => PromiseResultShape<U, E>;
    mapErr: <U>() => PromiseResultShape<T, U>;
    get: () => T;
    getOr: (orValue: T) => T;
}
