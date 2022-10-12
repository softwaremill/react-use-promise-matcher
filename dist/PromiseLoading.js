export class PromiseLoading {
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
