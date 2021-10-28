import { useCallback, useEffect, useRef } from "react";
import { usePromise } from "./usePromiseMatcher";
export var usePromiseWithInterval = function (loaderFn, interval) {
    var _a = usePromise(loaderFn), result = _a[0], load = _a[1], reset = _a[2];
    var timer = useRef(null);
    var start = useCallback(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        function tick() {
            load.apply(void 0, args);
        }
        timer.current = setInterval(tick, interval);
    }, [load, interval, timer]);
    var stop = useCallback(function () {
        clearInterval(timer.current);
    }, [timer]);
    useEffect(function () {
        return function () {
            clearInterval(timer.current);
            timer.current = null;
        };
    }, [timer]);
    return [result, start, stop, reset];
};
