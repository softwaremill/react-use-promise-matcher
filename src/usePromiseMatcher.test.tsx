import * as React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { usePromise } from "./usePromiseMatcher";
import "@testing-library/jest-dom/extend-expect";

interface TestData {
    data: string;
}

interface TestComponent {
    loader: () => Promise<TestData>;
}

interface Params {
    param: string;
}

interface TestComponentWithArguments {
    loader: (params: Params) => Promise<TestData>;
}

const IDLE_MESSAGE = "Waiting for call";
const LOADING_MESSAGE = "Loading";
const ERROR_MESSAGE = "Promise was rejected";
const SAMPLE_TEXT = "Some asynchronously loaded text";

const testData: TestData = { data: SAMPLE_TEXT };
const containerId = "container";
const loadButtonId = "loadButton";
const clearButtonId = "clearButton";

const TestComponent: React.FC<TestComponent> = ({ loader }: TestComponent) => {
    const [result, load, clear] = usePromise(loader);
    return (
        <div data-testid={containerId}>
            {result.match({
                Idle: () => IDLE_MESSAGE,
                Loading: () => LOADING_MESSAGE,
                Rejected: (err) => err,
                Resolved: (res) => res.data,
            })}
            <button data-testid={loadButtonId} onClick={load}>
                Load
            </button>
            <button data-testid={clearButtonId} onClick={clear}>
                Clear
            </button>
        </div>
    );
};

const TestComponentWithArguments: React.FC<TestComponentWithArguments> = ({ loader }: TestComponentWithArguments) => {
    const [result, load, clear] = usePromise(loader);

    const onClick = () => load({ param: SAMPLE_TEXT });

    return (
        <div data-testid={containerId}>
            {result.match({
                Idle: () => IDLE_MESSAGE,
                Loading: () => LOADING_MESSAGE,
                Rejected: (err) => err,
                Resolved: (res) => res.data,
            })}
            <button data-testid={loadButtonId} onClick={onClick}>
                Load
            </button>
            <button data-testid={clearButtonId} onClick={clear}>
                Clear
            </button>
        </div>
    );
};

describe("usePromise with a no-arguments loader function", () => {
    const loadSomePromise = jest.fn((): Promise<TestData> => Promise.resolve(testData));
    const loadFailingPromise = jest.fn((): Promise<TestData> => Promise.reject(ERROR_MESSAGE));

    afterEach(() => {
        loadSomePromise.mockClear();
        loadFailingPromise.mockClear();
    });

    it("Idle message should be rendered if the promise loader function hasn't been called yet", () => {
        expect(render(<TestComponent loader={loadSomePromise} />).getByTestId(containerId)).toHaveTextContent(
            IDLE_MESSAGE,
        );
        expect(loadSomePromise).toHaveBeenCalledTimes(0);
    });

    it("Text from testData object should be rendered after the load button was clicked and promise has been resolved", async () => {
        const { getByTestId } = render(<TestComponent loader={loadSomePromise} />);

        fireEvent.click(getByTestId(loadButtonId));
        expect(getByTestId(containerId)).toHaveTextContent(LOADING_MESSAGE);
        expect(loadSomePromise).toHaveBeenCalledTimes(1);
        /* 
            TODO replace 'waitForElement' with 'waitFor' and update dependencies when following PRs are merged:
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43108
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43102  
        */
        const element = await waitForElement(() => getByTestId(containerId));
        expect(element).toHaveTextContent(SAMPLE_TEXT);
    });

    it("Error message should be rendered after the promise has been rejected", async () => {
        const { getByTestId } = render(<TestComponent loader={loadFailingPromise} />);

        fireEvent.click(getByTestId(loadButtonId));
        expect(getByTestId(containerId)).toHaveTextContent(LOADING_MESSAGE);
        expect(loadFailingPromise).toHaveBeenCalledTimes(1);
        /* 
            TODO replace 'waitForElement' with 'waitFor' and update dependencies when following PRs are merged:
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43108
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43102  
        */
        const element = await waitForElement(() => getByTestId(containerId));
        expect(element).toHaveTextContent(ERROR_MESSAGE);
    });

    it("Idle message should be rendered after the clear function was called", async () => {
        const { getByTestId } = render(<TestComponent loader={loadSomePromise} />);

        fireEvent.click(getByTestId(loadButtonId));
        expect(getByTestId(containerId)).toHaveTextContent(LOADING_MESSAGE);
        /* 
            TODO replace 'waitForElement' with 'waitFor' and update dependencies when following PRs are merged:
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43108
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43102  
        */
        let element = await waitForElement(() => getByTestId(containerId));
        expect(element).toHaveTextContent(SAMPLE_TEXT);

        fireEvent.click(getByTestId(clearButtonId));
        element = await waitForElement(() => getByTestId(containerId));

        expect(element).toHaveTextContent(IDLE_MESSAGE);
    });

    it("should not throw `Warning: Can't perform a React state update on an unmounted component.` when Promise resolves after the component was unmounted", async () => {
        const consoleSpy = jest.spyOn(console, "error");

        // Deferes resolving the promise until after the unmount() is called
        const loadDeferredPromise = jest.fn(
            (): Promise<TestData> => new Promise((resolve) => setTimeout(() => resolve(testData), 0)),
        );
        const { unmount, container, getByTestId } = render(<TestComponent loader={loadDeferredPromise} />);
        fireEvent.click(getByTestId(loadButtonId));
        unmount();

        // Waits for the Promise from loadDeferredPromise to resolve
        await new Promise((resolve) => setTimeout(() => resolve(), 0));

        expect(container.innerHTML).toEqual("");

        // With unsafe state handling we would get "Warning: Can't perform a React state update on an unmounted component." in the console.error
        expect(consoleSpy).toHaveBeenCalledTimes(0);
    });
});

describe("usePromise with a loader function with arguments", () => {
    const loadSomePromise = jest.fn(
        (params: Params): Promise<TestData> => Promise.resolve<TestData>({ data: params.param }),
    );
    const loadFailingPromise = jest.fn((): Promise<TestData> => Promise.reject(ERROR_MESSAGE));

    afterEach(() => {
        loadSomePromise.mockClear();
        loadFailingPromise.mockClear();
    });

    it("Idle message should be rendered if the promise loader function hasn't been called yet", () => {
        expect(
            render(<TestComponentWithArguments loader={loadSomePromise} />).getByTestId(containerId),
        ).toHaveTextContent(IDLE_MESSAGE);
        expect(loadSomePromise).toHaveBeenCalledTimes(0);
    });

    it("Text from testData object should be rendered after the load button was clicked and promise has been resolved", async () => {
        const { getByTestId } = render(<TestComponentWithArguments loader={loadSomePromise} />);

        fireEvent.click(getByTestId(loadButtonId));
        expect(getByTestId(containerId)).toHaveTextContent(LOADING_MESSAGE);
        expect(loadSomePromise).toHaveBeenCalledTimes(1);
        /* 
            TODO replace 'waitForElement' with 'waitFor' and update dependencies when following PRs are merged:
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43108
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43102  
        */
        const element = await waitForElement(() => getByTestId(containerId));
        expect(element).toHaveTextContent(SAMPLE_TEXT);
    });

    it("Error message should be rendered after the promise has been rejected", async () => {
        const { getByTestId } = render(<TestComponentWithArguments loader={loadFailingPromise} />);

        fireEvent.click(getByTestId(loadButtonId));
        expect(getByTestId(containerId)).toHaveTextContent(LOADING_MESSAGE);
        expect(loadFailingPromise).toHaveBeenCalledTimes(1);
        /* 
            TODO replace 'waitForElement' with 'waitFor' and update dependencies when following PRs are merged:
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43108
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43102  
        */
        const element = await waitForElement(() => getByTestId(containerId));
        expect(element).toHaveTextContent(ERROR_MESSAGE);
    });

    it("Idle message should be rendered after the clear function was called", async () => {
        const { getByTestId } = render(<TestComponentWithArguments loader={loadSomePromise} />);

        fireEvent.click(getByTestId(loadButtonId));
        expect(getByTestId(containerId)).toHaveTextContent(LOADING_MESSAGE);
        /* 
            TODO replace 'waitForElement' with 'waitFor' and update dependencies when following PRs are merged:
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43108
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43102  
        */
        let element = await waitForElement(() => getByTestId(containerId));
        expect(element).toHaveTextContent(SAMPLE_TEXT);

        fireEvent.click(getByTestId(clearButtonId));
        element = await waitForElement(() => getByTestId(containerId));

        expect(element).toHaveTextContent(IDLE_MESSAGE);
    });
});
