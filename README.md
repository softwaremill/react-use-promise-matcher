This library provides hooks that aim to facilitate working with asynchronous data in React. Implementing components that depend on some data fetched from an API can generate a significant amount of boilerplate code as it is a common that we need to handle the following situations:

1. The data hasn't been loaded yet, so we want to display some kind of loading feedback to the user.
2. Request failed with an error and we should handle this situation somehow.
3. Request was successful and we want to render the component.

Unfortunately, we cannot monitor the state of a `Promise` as it is a stateless object. We can keep the information about the status of the request within the component's state though, however this usually forces us to repeat the same code across many components.

The `usePromise` and `usePromiseWithArguments` hooks let you manage the state of a `Promise` without redundant boilerplate. A asynchronous request is represented by four states:

-   `Idle`
-   `Loading`
-   `Rejected`
-   `Resolved`
