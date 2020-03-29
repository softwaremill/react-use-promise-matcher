import * as React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { usePromise, usePromiseWithArguments } from "./usePromiseMatcher";
import "@testing-library/jest-dom/extend-expect";

interface TestData {
    data: string;
}

interface TestComponent {
    loader: () => Promise<TestData>;
}

interface Params {
    someParams: string;
}

interface TestComponentWithArguments {
    loader: (params: Params) => Promise<TestData>;
}

const LOADING_MESSAGE = "Loading";
const ERROR_MESSAGE = "Promise was rejected";
const SAMPLE_TEXT = "Some asynchronously loaded text";

const testData: TestData = { data: SAMPLE_TEXT };

const containerId = "container";

const loadSomePromise = jest.fn(() => Promise.resolve(testData));

const loadFailingPromise = jest.fn(() => Promise.reject(ERROR_MESSAGE));

const TestComponent: React.FC<TestComponent> = ({ loader }: TestComponent) => {
    const { load, result } = usePromise<TestData>(loader);
    return (
        <div data-testid={containerId}>
            {result.match({
                Loading: () => LOADING_MESSAGE,
                Rejected: (err) => err,
                Resolved: (res) => res.data,
            })}
            <button onClick={load}>Load</button>
        </div>
    );
};

const TestComponentWithArguments: React.FC<TestComponentWithArguments> = ({ loader }: TestComponentWithArguments) => {
    const { load, result } = usePromiseWithArguments<TestData, Params>(loader);

    const onClick = () => load({ someParams: "someParams" });

    return (
        <div data-testid={containerId}>
            {result.match({
                Loading: () => LOADING_MESSAGE,
                Rejected: (err) => err,
                Resolved: (res) => res.data,
            })}
            <button onClick={onClick}>Load</button>
        </div>
    );
};

describe("usePromise", () => {
    it("Loading message should be rendered by default if the promise loader function hasn't been called yet", () => {
        expect(render(<TestComponent loader={loadSomePromise} />).getByTestId(containerId)).toHaveTextContent(
            LOADING_MESSAGE,
        );
        expect(loadSomePromise).toHaveBeenCalledTimes(0);
    });

    it("Text from testData object should be rendered after the promise has been resolved", async () => {
        const { getByTestId, getByRole } = render(<TestComponent loader={loadSomePromise} />);

        fireEvent.click(getByRole("button"));
        /* 
            TODO replace 'waitForElement' with 'waitFor' and update dependencies when following PRs are merged:
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43108
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43102  
        */
        expect(getByTestId(containerId)).toHaveTextContent(LOADING_MESSAGE);
        expect(loadSomePromise).toHaveBeenCalledTimes(1);
        const element = await waitForElement(() => getByTestId(containerId));
        expect(element).toHaveTextContent(SAMPLE_TEXT);
    });

    it("Error message should be rendered after the promise has been rejected", async () => {
        const { getByTestId, getByRole } = render(<TestComponent loader={loadFailingPromise} />);

        fireEvent.click(getByRole("button"));
        expect(getByTestId(containerId)).toHaveTextContent(LOADING_MESSAGE);
        expect(loadSomePromise).toHaveBeenCalledTimes(1);
        /* 
            TODO replace 'waitForElement' with 'waitFor' and update dependencies when following PRs are merged:
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43108
            - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43102  
        */
        const element = await waitForElement(() => getByTestId(containerId));
        expect(element).toHaveTextContent(ERROR_MESSAGE);
    });
});
