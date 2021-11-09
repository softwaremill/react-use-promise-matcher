'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

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

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var PromiseLoading = /** @class */ (function () {
    function PromiseLoading() {
        var _this = this;
        this.isIdle = false;
        this.isLoading = true;
        this.isResolved = false;
        this.isRejected = false;
        this.match = function (matcher) { return matcher.Loading(); };
        this.map = function () { return new PromiseLoading(); };
        this.flatMap = function () { return new PromiseLoading(); };
        this.mapErr = function () { return new PromiseLoading(); };
        this.get = function () {
            throw new Error("Cannot get the value while the Promise is loading");
        };
        this.getOr = function (orValue) { return orValue; };
        this.onResolved = function (_) {
            return _this;
        };
        this.onRejected = function (_) {
            return _this;
        };
        this.onLoading = function (fn) {
            fn();
            return _this;
        };
        this.onIdle = function (_) {
            return _this;
        };
    }
    return PromiseLoading;
}());

var PromiseRejected = /** @class */ (function () {
    function PromiseRejected(reason) {
        var _this = this;
        this.reason = reason;
        this.isIdle = false;
        this.isLoading = false;
        this.isResolved = false;
        this.isRejected = true;
        this.match = function (matcher) { return matcher.Rejected(_this.reason); };
        this.map = function () { return new PromiseRejected(_this.reason); };
        this.flatMap = function () { return new PromiseRejected(_this.reason); };
        this.mapErr = function (fn) { return new PromiseRejected(fn(_this.reason)); };
        this.get = function () {
            throw _this.reason;
        };
        this.getOr = function (orValue) { return orValue; };
        this.onResolved = function (_) {
            return _this;
        };
        this.onRejected = function (fn) {
            fn(_this.reason);
            return _this;
        };
        this.onLoading = function (_) {
            return _this;
        };
        this.onIdle = function (_) {
            return _this;
        };
    }
    return PromiseRejected;
}());
var isPromiseRejected = function (promiseResultShape) { return promiseResultShape.isRejected; };

var PromiseResolved = /** @class */ (function () {
    function PromiseResolved(value) {
        var _this = this;
        this.value = value;
        this.isIdle = false;
        this.isLoading = false;
        this.isResolved = true;
        this.isRejected = false;
        this.match = function (matcher) { return matcher.Resolved(_this.value); };
        this.map = function (fn) { return new PromiseResolved(fn(_this.value)); };
        this.flatMap = function (fn) { return fn(_this.value); };
        this.mapErr = function () { return new PromiseResolved(_this.value); };
        this.get = function () {
            return _this.value;
        };
        this.getOr = function () { return _this.get(); };
        this.onResolved = function (fn) {
            fn(_this.get());
            return _this;
        };
        this.onRejected = function (_) {
            return _this;
        };
        this.onLoading = function (_) {
            return _this;
        };
        this.onIdle = function (_) {
            return _this;
        };
    }
    return PromiseResolved;
}());
var isPromiseResolved = function (promiseResultShape) { return promiseResultShape.isResolved; };

var PromiseIdle = /** @class */ (function () {
    function PromiseIdle() {
        var _this = this;
        this.isIdle = true;
        this.isLoading = false;
        this.isResolved = false;
        this.isRejected = false;
        this.match = function (matcher) { return (matcher.Idle ? matcher.Idle() : matcher.Loading()); };
        this.map = function () { return new PromiseIdle(); };
        this.flatMap = function () { return new PromiseIdle(); };
        this.mapErr = function () { return new PromiseIdle(); };
        this.get = function () {
            throw new Error("Cannot get the value while the Promise is idle");
        };
        this.getOr = function (orValue) { return orValue; };
        this.onResolved = function (_) {
            return _this;
        };
        this.onRejected = function (_) {
            return _this;
        };
        this.onLoading = function (_) {
            return _this;
        };
        this.onIdle = function (fn) {
            fn();
            return _this;
        };
    }
    return PromiseIdle;
}());

var usePromise = function (loaderFn) {
    var _a = React.useState(new PromiseIdle()), result = _a[0], setResult = _a[1];
    var unmounted = React.useRef(false);
    var safeSetResult = React.useCallback(function (res) {
        if (unmounted.current) {
            return;
        }
        setResult(res);
    }, []);
    var load = React.useCallback(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        safeSetResult(new PromiseLoading());
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, loaderFn.apply(void 0, args)];
                    case 2:
                        data = _a.sent();
                        safeSetResult(new PromiseResolved(data));
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        safeSetResult(new PromiseRejected(err_1));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }, [loaderFn]);
    var clear = function () { return safeSetResult(new PromiseIdle()); };
    React.useEffect(function () { return function () {
        unmounted.current = true;
    }; }, []);
    return [result, load, clear];
};

var usePromiseWithInterval = function (loaderFn, interval) {
    var _a = usePromise(loaderFn), result = _a[0], load = _a[1], reset = _a[2];
    var timer = React.useRef(undefined);
    var start = React.useCallback(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        timer.current = setTimeout(function tick() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, load.apply(void 0, args)];
                        case 1:
                            _a.sent();
                            timer.current = setTimeout(tick, interval);
                            return [2 /*return*/];
                    }
                });
            });
        }, interval);
    }, [load, interval, timer]);
    var stop = React.useCallback(function () {
        clearTimeout(timer.current);
    }, [timer]);
    React.useEffect(function () {
        return function () {
            clearTimeout(timer.current);
            timer.current = undefined;
        };
    }, [timer]);
    return [result, start, stop, reset];
};

exports.PromiseIdle = PromiseIdle;
exports.PromiseLoading = PromiseLoading;
exports.PromiseRejected = PromiseRejected;
exports.PromiseResolved = PromiseResolved;
exports.isPromiseRejected = isPromiseRejected;
exports.isPromiseResolved = isPromiseResolved;
exports.usePromise = usePromise;
exports.usePromiseWithInterval = usePromiseWithInterval;
//# sourceMappingURL=index-commonjs.js.map
