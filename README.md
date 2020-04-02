# react-use-promise-matcher

This library provides two hooks that aim to facilitate working with asynchronous data in React. Implementing components that depend on some data fetched from an API can generate a significant amount of boilerplate code as it is a common that we need to handle the following situations:

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
This how we would use the `usePromise` hook to render the received text based on what the method returns:

```
const echo = (text: string): Promise<string> =>
  new Promise(resolve => setTimeout(() => resolve(text), 3000));

export const EchoComponent = () => {
  const { result, load } = usePromise<string>(() => echo("Echo!"));

  React.useEffect(() => {
    load();
  }, []);

  return result.match({
    Idle: () => <></>,
    Loading: () => <span>I say "echo!"</span>,
    Rejected: err => <span>Ups, something went wrong! Error: {err}</span>,
    Resolved: echoResponse => <span>Echo says "{echoResponse}"</span>
  });
};
```

The hook accepts a function that returns a `Promise`, as simple as that. The type parameter defines the type of data wrapped by the `Promise`. It returns a `load` function which simply calls the function provided as an argument within the hook and a `result` object that represents the result of the asynchronous operation and let's us match its states.

#### Auto-resolving the promise on component mount

We could also skip the `load` function call in the `useEffect` hook and tell `usePromise` to automatically start resolving by passing a second argument to the hook with some configuration:

```
const { result } = usePromise<string>(() => echo("Echo!"), { autoLoad: true });
```

The rest of the component would still look and work exactly the same.

It's also worth mentioning that matching the `Idle` state is optional, if you decide to start loading the data right after the component is mounted, it makes no sense to use it, as `result` will move directly into the `Loading` state. The mapping for the `Loading` state will be taken for the `Idle` state if none is passed.

#### Error handling

We can provide a second type parameter to the hook, which defines the type of error that is returned on rejection. By default it is set to string. If we are using some type of domain exceptions in our services we could use the hook as following:

```
const { result } = usePromise<SomeData, MyDomainException>(() => myServiceMethod(someArgument));
```

and then we would match the `Rejected` state like that:

```
result.match({
	...
	Rejected: (err: MyDomainException) => err.someCustomField,
	...
})
```

#### Using the hook with an async function that receives arguments

As you might have noticed, in the exapmles we passed a function that was not taking any parameters to the hook. We might want to be able to pass some arguments to it, for example if they depend on user input. In that case we need to use the `usePromiseWithArguments` hook:

```
export const UserEchoComponent = () => {
  const [text, setText] = React.useState("Hello!");
  const { result, load } = usePromiseWithArguments<string, string>(
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
        Rejected: err => <span>Ups, something went wrong! Error: {err}</span>,
        Resolved: echoResponse => <span>Echo says "{echoResponse}"</span>
      })}
    </div>
  )
```

In this example, the parameters of the async function used depend on the user input, so we cannot pass them directly to the hook, but we need to pass them the the `load` function. The `usePromiseWithArguments` hook takes three type parameters, the first and last are the same as in `usePromise`, the second one though is the type of the argument passed to the `load` function.
