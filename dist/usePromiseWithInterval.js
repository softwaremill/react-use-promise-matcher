var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useEffect, useRef, useState } from "react";
import { usePromise } from "./usePromiseMatcher";
export const usePromiseWithInterval = (loaderFn, interval) => {
    const [result, load, reset] = usePromise(loaderFn);
    const [tryCount, setTryCount] = useState(0);
    const increment = useCallback(() => {
        setTryCount((v) => v + 1);
    }, [setTryCount]);
    const timer = useRef(undefined);
    const start = useCallback((...args) => {
        timer.current = setTimeout(function tick() {
            return __awaiter(this, void 0, void 0, function* () {
                yield load(...args);
                timer.current = setTimeout(tick, interval);
            });
        }, interval);
    }, [load, interval, timer]);
    useEffect(() => {
        if (result.isLoading) {
            increment();
        }
    }, [result, increment]);
    const stop = useCallback(() => {
        clearTimeout(timer.current);
    }, [timer]);
    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
            timer.current = undefined;
        };
    }, [timer]);
    return [result, start, stop, load, reset, tryCount];
};
