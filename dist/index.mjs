import { useState, useCallback, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class PromiseLoading {
    constructor() {
        this.isIdle = false;
        this.isLoading = true;
        this.isResolved = false;
        this.isRejected = false;
        this.match = (matcher) => matcher.Loading();
        this.map = () => new PromiseLoading();
        this.flatMap = () => new PromiseLoading();
        this.mapErr = () => new PromiseLoading();
        this.get = () => {
            throw new Error("Cannot get the value while the Promise is loading");
        };
        this.getOr = (orValue) => orValue;
        this.onResolved = (_) => {
            return this;
        };
        this.onRejected = (_) => {
            return this;
        };
        this.onLoading = (fn) => {
            fn();
            return this;
        };
        this.onIdle = (_) => {
            return this;
        };
    }
}

class PromiseRejected {
    constructor(reason) {
        this.reason = reason;
        this.isIdle = false;
        this.isLoading = false;
        this.isResolved = false;
        this.isRejected = true;
        this.match = (matcher) => matcher.Rejected(this.reason);
        this.map = () => new PromiseRejected(this.reason);
        this.flatMap = () => new PromiseRejected(this.reason);
        this.mapErr = (fn) => new PromiseRejected(fn(this.reason));
        this.get = () => {
            throw this.reason;
        };
        this.getOr = (orValue) => orValue;
        this.onResolved = (_) => {
            return this;
        };
        this.onRejected = (fn) => {
            fn(this.reason);
            return this;
        };
        this.onLoading = (_) => {
            return this;
        };
        this.onIdle = (_) => {
            return this;
        };
    }
}
const isPromiseRejected = (promiseResultShape) => promiseResultShape.isRejected;

class PromiseResolved {
    constructor(value) {
        this.value = value;
        this.isIdle = false;
        this.isLoading = false;
        this.isResolved = true;
        this.isRejected = false;
        this.match = (matcher) => matcher.Resolved(this.value);
        this.map = (fn) => new PromiseResolved(fn(this.value));
        this.flatMap = (fn) => fn(this.value);
        this.mapErr = () => new PromiseResolved(this.value);
        this.get = () => {
            return this.value;
        };
        this.getOr = () => this.get();
        this.onResolved = (fn) => {
            fn(this.get());
            return this;
        };
        this.onRejected = (_) => {
            return this;
        };
        this.onLoading = (_) => {
            return this;
        };
        this.onIdle = (_) => {
            return this;
        };
    }
}
const isPromiseResolved = (promiseResultShape) => promiseResultShape.isResolved;

class PromiseIdle {
    constructor() {
        this.isIdle = true;
        this.isLoading = false;
        this.isResolved = false;
        this.isRejected = false;
        this.match = (matcher) => (matcher.Idle ? matcher.Idle() : matcher.Loading());
        this.map = () => new PromiseIdle();
        this.flatMap = () => new PromiseIdle();
        this.mapErr = () => new PromiseIdle();
        this.get = () => {
            throw new Error("Cannot get the value while the Promise is idle");
        };
        this.getOr = (orValue) => orValue;
        this.onResolved = (_) => {
            return this;
        };
        this.onRejected = (_) => {
            return this;
        };
        this.onLoading = (_) => {
            return this;
        };
        this.onIdle = (fn) => {
            fn();
            return this;
        };
    }
}

const usePromise = (loaderFn) => {
    const [result, setResult] = useState(new PromiseIdle());
    const load = useCallback((...args) => __awaiter(void 0, void 0, void 0, function* () {
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

const usePromiseWithInterval = (loaderFn, interval) => {
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

export { PromiseIdle, PromiseLoading, PromiseRejected, PromiseResolved, isPromiseRejected, isPromiseResolved, usePromise, usePromiseWithInterval };
//# sourceMappingURL=index.mjs.map
