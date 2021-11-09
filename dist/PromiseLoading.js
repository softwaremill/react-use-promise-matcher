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
export { PromiseLoading };
