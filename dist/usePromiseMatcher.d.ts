import { PromiseLoader, UsePromise } from "./types";
export declare const usePromise: <T, Args extends any[], E = string>(loaderFn: PromiseLoader<T, Args>) => UsePromise<T, Args, E>;
