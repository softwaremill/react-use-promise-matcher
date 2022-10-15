export class PromiseIdle {
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
