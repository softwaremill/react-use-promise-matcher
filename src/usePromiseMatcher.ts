import * as React from "react";
import { PromiseLoading } from "./PromiseLoading";
import { PromiseRejected } from "./PromiseRejected";
import { PromiseResolved } from "./PromiseResolved";
import { PromiseResultShape, PromiseLoader, UsePromise } from "./types";
import { PromiseIdle } from "./PromiseIdle";
import { flushSync } from "react-dom";

export const usePromise = <T, Args extends any[], E = string>(
    loaderFn: PromiseLoader<T, Args>,
): UsePromise<T, Args, E> => {
    const [result, setResult] = React.useState<PromiseResultShape<T, E>>(new PromiseIdle<T, E>());

    const load = React.useCallback(
        async (...args: Args): Promise<void> => {
            setResult(new PromiseLoading<T, E>());
            try {
                const data: T = await loaderFn(...args);
                flushSync(() => setResult(new PromiseResolved(data)));
            } catch (err) {
                flushSync(() => setResult(new PromiseRejected<T, E>(err as E)));
            }
        },
        [loaderFn],
    );

    const clear = () => setResult(new PromiseIdle<T, E>());

    return [result, load, clear];
};
