import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { PromiseLoader, UsePromiseWithInterval } from "./types";
import { usePromise } from "./usePromiseMatcher";

export const usePromiseWithInterval = <T, Args extends any[], E = string>(
    loaderFn: PromiseLoader<T, Args>,
    interval: number,
): UsePromiseWithInterval<T, E, Args> => {
    const [result, load, reset] = usePromise<T, Args, E>(loaderFn);

    const timer: MutableRefObject<any | null> = useRef(null);

    const start = useCallback(
        (...args: Args) => {
            function tick(): void {
                load(...args);
            }
            timer.current = setInterval(tick, interval);
        },
        [load, interval, timer],
    );

    const stop = useCallback(() => {
        clearInterval(timer.current);
    }, [timer]);

    useEffect(() => {
        return () => {
            clearInterval(timer.current);
            timer.current = null;
        };
    }, [timer]);

    return [result, start, stop, reset];
};
