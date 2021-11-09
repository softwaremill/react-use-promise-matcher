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
    }
    return PromiseRejected;
}());
export { PromiseRejected };
export var isPromiseRejected = function (promiseResultShape) { return promiseResultShape.isRejected; };
