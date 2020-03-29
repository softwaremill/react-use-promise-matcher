import { useState, useEffect } from "react";
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

export const usePromise = <T, E = string>(loaderFn: PromiseLoader<T>, config?: UsePromiseConfig): UsePromise<T, E> => {
    const [result, setResult] = useState<PromiseResultShape<T, E>>(new PromiseLoading<T, E>());

    const load = async (): Promise<void> => {
        setResult(new PromiseLoading<T, E>());
        try {
            const data: T = await loaderFn();
            setResult(new PromiseResolved(data));
        } catch (err) {
            setResult(new PromiseRejected(err));
        }
    };

    useEffect(() => {
        if (config?.autoLoad) {
            load();
        }
    }, [config?.autoLoad]);

    return {
        load,
        result,
    };
};

export const usePromiseWithArguments = <T extends object, P extends object, E = string>(
    loaderFn: PromiseLoaderWithArguments<T, P>,
): UsePromiseWithArguments<T, P, E> => {
    const [result, setResult] = useState<PromiseResultShape<T, E>>(new PromiseLoading<T, E>());

    const load = async (params: P): Promise<void> => {
        setResult(new PromiseLoading<T, E>());
        try {
            const data: T = await loaderFn(params);
            setResult(new PromiseResolved(data));
        } catch (err) {
            setResult(new PromiseRejected(err));
        }
    };

    return {
        load,
        result,
    };
};
