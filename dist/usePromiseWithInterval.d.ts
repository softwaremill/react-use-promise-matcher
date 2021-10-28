import { PromiseLoader, UsePromiseWithInterval } from "./types";
export declare const usePromiseWithInterval: <T, Args extends any[], E = string>(loaderFn: PromiseLoader<T, Args>, interval: number) => UsePromiseWithInterval<T, E, Args>;
