import { PromiseMatcher, PromiseResultShape } from "./types";
export declare class PromiseIdle<T, E> implements PromiseResultShape<T, E> {
    isIdle: boolean;
    isLoading: boolean;
    isResolved: boolean;
    isRejected: boolean;
    match: <U>(matcher: PromiseMatcher<T, E, U>) => U;
    map: <U>() => PromiseResultShape<U, E>;
    flatMap: <U>() => PromiseResultShape<U, E>;
    mapErr: <U>() => PromiseResultShape<T, U>;
    get: () => T;
    getOr: (orValue: T) => T;
}
