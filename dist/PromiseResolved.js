export class PromiseResolved {
    constructor(value) {
        this.value = value;
        this.isIdle = false;
        this.isLoading = false;
        this.isResolved = true;
        this.isRejected = false;
        this.match = (matcher) => matcher.Resolved(this.value);
        this.map = (fn) => new PromiseResolved(fn(this.value));
        this.flatMap = (fn) => fn(this.value);
        this.mapErr = () => new PromiseResolved(this.value);
        this.get = () => {
            return this.value;
        };
        this.getOr = () => this.get();
        this.onResolved = (fn) => {
            fn(this.get());
            return this;
        };
        this.onRejected = (_) => {
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
export const isPromiseResolved = (promiseResultShape) => promiseResultShape.isResolved;
