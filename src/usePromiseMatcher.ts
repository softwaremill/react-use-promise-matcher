import * as React from "react";
import { PromiseLoading } from "./PromiseLoading";
import { PromiseRejected } from "./PromiseRejected";
import { PromiseResolved } from "./PromiseResolved";
import {
    PromiseResultShape,
    PromiseLoader,
    UsePromise,
    UsePromiseWithArguments,
    PromiseLoaderWithArguments,
    UsePromiseConfig,
} from "./types";
import { PromiseIdle } from "./PromiseIdle";

export const usePromise = <T, E = string>(loaderFn: PromiseLoader<T>, config?: UsePromiseConfig): UsePromise<T, E> => {
    const [result, setResult] = React.useState<PromiseResultShape<T, E>>(new PromiseIdle<T, E>());

    const load = async (): Promise<void> => {
        setResult(new PromiseLoading<T, E>());
        try {
            const data: T = await loaderFn();
            setResult(new PromiseResolved(data));
        } catch (err) {
            setResult(new PromiseRejected(err));
        }
    };

    const clear = () => setResult(new PromiseIdle<T, E>());

    React.useEffect(() => {
        if (config?.autoLoad) {
            load();
        }
    }, []);

    return {
        load,
        result,
        clear,
    };
};

export const usePromiseWithArguments = <T, P, E = string>(
    loaderFn: PromiseLoaderWithArguments<T, P>,
): UsePromiseWithArguments<T, P, E> => {
    const [result, setResult] = React.useState<PromiseResultShape<T, E>>(new PromiseIdle<T, E>());

    const load = async (params: P): Promise<void> => {
        setResult(new PromiseLoading<T, E>());
        try {
            const data: T = await loaderFn(params);
            setResult(new PromiseResolved(data));
        } catch (err) {
            setResult(new PromiseRejected(err));
        }
    };

    const clear = () => setResult(new PromiseIdle<T, E>());

    return {
        load,
        result,
        clear,
    };
};
