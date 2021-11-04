import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { PromiseLoader, UsePromiseWithInterval } from "./types";
import { usePromise } from "./usePromiseMatcher";

export const usePromiseWithInterval = <T, Args extends any[], E = string>(
    loaderFn: PromiseLoader<T, Args>,
    interval: number,
): UsePromiseWithInterval<T, E, Args> => {
    const [result, load, reset] = usePromise<T, Args, E>(loaderFn);

    const timer: MutableRefObject<number | undefined> = useRef(undefined);

    const start = useCallback(
        (...args: Args) => {
            timer.current = setTimeout(async function tick() {
                await load(...args);
                timer.current = setTimeout(tick, interval);
            }, interval);
        },
        [load, interval, timer],
    );

    const stop = useCallback(() => {
        clearTimeout(timer.current);
    }, [timer]);

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
            timer.current = undefined;
        };
    }, [timer]);

    return [result, start, stop, reset];
};
