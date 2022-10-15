var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from "react";
import { PromiseLoading } from "./PromiseLoading";
import { PromiseRejected } from "./PromiseRejected";
import { PromiseResolved } from "./PromiseResolved";
import { PromiseIdle } from "./PromiseIdle";
import { flushSync } from "react-dom";
export const usePromise = (loaderFn) => {
    const [result, setResult] = React.useState(new PromiseIdle());
    const load = React.useCallback((...args) => __awaiter(void 0, void 0, void 0, function* () {
        setResult(new PromiseLoading());
        try {
            const data = yield loaderFn(...args);
            flushSync(() => setResult(new PromiseResolved(data)));
        }
        catch (err) {
            flushSync(() => setResult(new PromiseRejected(err)));
        }
    }), [loaderFn]);
    const clear = () => setResult(new PromiseIdle());
    return [result, load, clear];
};
