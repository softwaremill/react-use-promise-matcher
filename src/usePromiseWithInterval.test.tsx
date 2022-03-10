import * as React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { usePromiseWithInterval } from "./usePromiseWithInterval";

interface TestData {
    data: string;
}

interface TestComponentWithoutArguments {
    loader: () => Promise<TestData>;
    interval: number;
}

const INTERVAL = 2000;
const IDLE_MESSAGE = "Waiting for call";
const LOADING_MESSAGE = "Loading";
const SAMPLE_TEXT = "Some asynchronously loaded text";

const startButtonId = "startButton";
const stopButtonId = "stopButton";
const retriesParagraphId = "retries";
const retryButtonId = "retry";

const nextExpectedResult = async (result: string, unexpectedResult?: string) => {
    act(() => {
        jest.advanceTimersByTime(INTERVAL);
    });

    if (unexpectedResult) {
        expect(screen.queryByText(unexpectedResult)).not.toBeInTheDocument();
    }
    expect(await screen.findByText(result)).toBeInTheDocument();
};

let index = 0;

const loadSomePromise = jest.fn((): Promise<TestData> => {
    return new Promise((resolve) => {
        resolve({
            data: `${SAMPLE_TEXT} ${index}`,
        });
        index++;
    });
});

const TestComponent: React.FC<TestComponentWithoutArguments> = ({ loader, interval }) => {
    const [result, start, stop, , , tryCount, resetTryCount] = usePromiseWithInterval(loader, interval);

    const onRetry = React.useCallback(() => {
        index = 0;
        resetTryCount();
        start();
    }, [resetTryCount, start]);

    return (
        <>
            {result.match({
                Idle: () => IDLE_MESSAGE,
                Loading: () => LOADING_MESSAGE,
                Rejected: (err) => err,
                Resolved: (res) => res.data,
            })}
            <button data-testid={startButtonId} onClick={start}>
                Start
            </button>
            <button data-testid={stopButtonId} onClick={stop}>
                Clear
            </button>
            <button data-testid={retryButtonId} onClick={onRetry}>
                Retry
            </button>
            <p data-testid={retriesParagraphId}>{tryCount}</p>
        </>
    );
};

describe("usePromiseWithInterval with a no-arguments loader function", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        loadSomePromise.mockClear();
    });

    it("Should start and stop the loader execution with specified interval", async () => {
        render(<TestComponent loader={loadSomePromise} interval={INTERVAL} />);

        const startButton = screen.getByTestId(startButtonId);
        const stopButton = screen.getByTestId(stopButtonId);
        const retryButton = screen.getByTestId(retryButtonId);

        fireEvent.click(startButton);

        await nextExpectedResult(`${SAMPLE_TEXT} 0`);
        await nextExpectedResult(`${SAMPLE_TEXT} 1`, `${SAMPLE_TEXT} 0`);
        await nextExpectedResult(`${SAMPLE_TEXT} 2`, `${SAMPLE_TEXT} 1`);
        await nextExpectedResult(`${SAMPLE_TEXT} 3`, `${SAMPLE_TEXT} 2`);

        fireEvent.click(stopButton);
        expect(await screen.findByText(`${SAMPLE_TEXT} 3`)).toBeInTheDocument();
        let retriesParagraph = await screen.findByTestId(retriesParagraphId);

        expect(retriesParagraph.textContent).toBe("4");

        fireEvent.click(retryButton);
        retriesParagraph = await screen.findByTestId(retriesParagraphId);
        expect(retriesParagraph.textContent).toBe("0");
    });
});
