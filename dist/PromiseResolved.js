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
        this.mapErr = function () { return new PromiseResolved(_this.value); };
        this.get = function () {
            return _this.value;
        };
        this.getOr = function () { return _this.get(); };
    }
    return PromiseResolved;
}());
export { PromiseResolved };
