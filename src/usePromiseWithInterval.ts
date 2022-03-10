import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { PromiseLoader, UsePromiseWithInterval } from "./types";
import { usePromise } from "./usePromiseMatcher";

export const usePromiseWithInterval = <T, Args extends any[], E = string>(
    loaderFn: PromiseLoader<T, Args>,
    interval: number,
): UsePromiseWithInterval<T, E, Args> => {
    const [result, load, reset] = usePromise<T, Args, E>(loaderFn);
    const [tryCount, setTryCount] = useState<number>(0);

    const timer: MutableRefObject<ReturnType<typeof setTimeout> | undefined> = useRef(undefined);

    const start = useCallback(
        (...args: Args) => {
            timer.current = setTimeout(async function tick() {
                setTryCount((v) => v + 1);
                await load(...args);
                timer.current = setTimeout(tick, interval);
            }, interval);
        },
        [load, setTryCount, interval, timer],
    );

    const resetTryCount = useCallback(() => {
        setTryCount(0);
    }, [setTryCount]);

    const stop = useCallback(() => {
        clearTimeout(timer.current as NodeJS.Timer);
    }, [timer]);

    useEffect(() => {
        return () => {
            clearTimeout(timer.current as NodeJS.Timer);
            timer.current = undefined;
        };
    }, [timer]);

    return [result, start, stop, load, reset, tryCount, resetTryCount];
};
