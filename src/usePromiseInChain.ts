import { PromiseLoader } from "./types";
import { usePromise } from "./usePromiseMatcher";

export const usePromiseInChain = <T, Args extends any[], E = string>(loaderFn: PromiseLoader<T, Args>) => {
    const [result, load, reset] = usePromise<T, Args, E>(loaderFn);
};
