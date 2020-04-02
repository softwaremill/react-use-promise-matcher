import { PromiseLoader, UsePromise, UsePromiseWithArguments, PromiseLoaderWithArguments, UsePromiseConfig } from "./types";
export declare const usePromise: <T, E = string>(loaderFn: PromiseLoader<T>, config?: UsePromiseConfig | undefined) => UsePromise<T, E>;
export declare const usePromiseWithArguments: <T, P, E = string>(loaderFn: PromiseLoaderWithArguments<T, P>) => UsePromiseWithArguments<T, P, E>;
