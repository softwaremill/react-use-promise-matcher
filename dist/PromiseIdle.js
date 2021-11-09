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
export { PromiseIdle };
