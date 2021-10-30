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
export { PromiseRejected };
export var isPromiseRejected = function (promiseResultShape) { return promiseResultShape.isRejected; };
