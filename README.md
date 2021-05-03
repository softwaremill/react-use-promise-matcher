# react-use-promise-matcher

## Installation

#### npm

```bash
npm install react-use-promise-matcher
```

#### yarn

```bash
yarn add react-use-promise-matcher
```

## About

This library provides two hooks that aim to facilitate working with asynchronous data in React. Implementing components that depend on some data fetched from an API can generate a significant amount of boilerplate code as it is a common practice to handle the following situations:

1. The data hasn't been loaded yet, so we want to display some kind of loading feedback to the user.
2. Request failed with an error and we should handle this situation somehow.
3. Request was successful and we want to render the component.

Unfortunately, we cannot monitor the state of a `Promise` as it is a stateless object. We can keep the information about the status of the request within the component's state though, however this usually forces us to repeat the same code across many components.

The `usePromise` and `usePromiseWithArguments` hooks let you manage the state of a `Promise` without redundant boilerplate by using the `PromiseResultShape` object, which is represented by four states:

-   `Idle` - a request hasn't been sent yet
-   `Loading` - waiting for the `Promise` to resolve
-   `Rejected` - the `Promise` was rejected
-   `Resolved` - the `Promise` was resolved successfully

The `PromiseResultShape` provides an API that lets you match each of the states and perform some actions accordingly or map them to some value, which is the main use case, as we would normally map the states to different components. Let's have a look at some examples then ...

## Examples

#### Basic usage

Let's assume we have a simple echo method that returns the string provided as an argument wrapped in a Promise.
This is how we would use the `usePromise` hook to render the received text based on what the method returns:

```tsx
const echo = (text: string): Promise<string> => new Promise((resolve) => setTimeout(() => resolve(text), 3000));

export const EchoComponent = () => {
    const [result, load] = usePromise<string>(() => echo("Echo!"));

    React.useEffect(() => {
        load();
    }, []);

    return result.match({
        Idle: () => <></>,
        Loading: () => <span>I say "echo!"</span>,
        Rejected: (err) => <span>Oops, something went wrong! Error: {err}</span>,
        Resolved: (echoResponse) => <span>Echo says "{echoResponse}"</span>,
    });
};
```

The hook accepts a function that returns a `Promise`, as simple as that. The type parameter defines the type of data wrapped by the `Promise`. It returns an array with a `result` object that represents the result of the asynchronous operation and lets us match its states and a `load` function which simply calls the function provided as an argument within the hook.

It's also worth mentioning that matching the `Idle` state is optional - the mapping for the `Loading` state will be taken for the `Idle` state if none is passed.

#### Using the hook with an async function that receives arguments

Sometimes it is necessary to pass some arguments to the promise loading function. You can simply pass such function as an argument to he `usePromise` hook, it's type safe as the types of the arguments will be inferred in the returned loading function. It's also possible to explicitly define them in the second type argument of the hook.
```tsx
export const UserEchoComponent = () => {
  const [text, setText] = React.useState("Hello!");
  const [result, load] = usePromise<string, [string]>(
    (param: string) => echo(param)
  );
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const callEcho = () => load(text);

  return (
    <div>
      <input value={text} onChange={onInputChange} />
      <button type="button" onClick={callEcho}>
        Call echo!
      </button>
      {result.match({
        Idle: () => <></>,
        Loading: () => <span>I say "{text}"!</span>,
        Rejected: err => <span>Oops, something went wrong! Error: {err}</span>,
        Resolved: echoResponse => <span>Echo says "{echoResponse}"</span>
      })}
    </div>
  );
}
```

#### Error handling

We can provide a third type parameter to the hook, which defines the type of error that is returned on rejection. By default, it is set to string. If we are using some type of domain exceptions in our services we could use the hook as following:

```tsx
const [result] = usePromise<SomeData, [], MyDomainException>(() => myServiceMethod(someArgument));
```

and then we would match the `Rejected` state like that:

```typescript
result.match({
    //...
    Rejected: (err: MyDomainException) => err.someCustomField,
    //...
});
```
