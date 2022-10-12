export class PromiseRejected {
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
export const isPromiseRejected = (promiseResultShape) => promiseResultShape.isRejected;
