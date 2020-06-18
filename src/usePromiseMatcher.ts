import * as React from "react";
import { PromiseLoading } from "./PromiseLoading";
import { PromiseRejected } from "./PromiseRejected";
import { PromiseResolved } from "./PromiseResolved";
import { PromiseResultShape, PromiseLoader, UsePromise } from "./types";
import { PromiseIdle } from "./PromiseIdle";

export const usePromise = <T, Args extends any[], E = string>(
    loaderFn: PromiseLoader<T, Args>,
): UsePromise<T, Args, E> => {
    const [result, setResult] = React.useState<PromiseResultShape<T, E>>(new PromiseIdle<T, E>());

    const load = React.useCallback(
        async (...args: Args): Promise<void> => {
            setResult(new PromiseLoading<T, E>());
            try {
                const data: T = await loaderFn(...args);
                setResult(new PromiseResolved(data));
            } catch (err) {
                setResult(new PromiseRejected(err));
            }
        },
        [loaderFn],
    );

    const clear = () => setResult(new PromiseIdle<T, E>());

    return [result, load, clear];
};
