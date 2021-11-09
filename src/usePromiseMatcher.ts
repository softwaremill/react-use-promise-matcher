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
    const unmounted = React.useRef(false);
    const safeSetResult = React.useCallback((res: PromiseResultShape<T, E>) => {
        if (unmounted.current) {
            return;
        }
        setResult(res);
    }, []);

    const load = React.useCallback(
        async (...args: Args): Promise<void> => {
            safeSetResult(new PromiseLoading<T, E>());
            try {
                const data: T = await loaderFn(...args);
                safeSetResult(new PromiseResolved(data));
            } catch (err) {
                safeSetResult(new PromiseRejected(err) as PromiseResultShape<T, E>);
            }
        },
        [loaderFn],
    );

    const clear = () => safeSetResult(new PromiseIdle<T, E>());

    React.useEffect(
        () => () => {
            unmounted.current = true;
        },
        [],
    );

    return [result, load, clear];
};
