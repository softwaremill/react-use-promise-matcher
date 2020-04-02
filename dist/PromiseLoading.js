var PromiseLoading = /** @class */ (function () {
    function PromiseLoading() {
        this.isIdle = false;
        this.isLoading = true;
        this.isResolved = false;
        this.isRejected = false;
        this.match = function (matcher) { return matcher.Loading(); };
        this.map = function () { return new PromiseLoading(); };
        this.mapErr = function () { return new PromiseLoading(); };
        this.get = function () {
            throw new Error("Cannot get the value while the Promise is loading");
        };
        this.getOr = function (orValue) { return orValue; };
    }
    return PromiseLoading;
}());
export { PromiseLoading };
