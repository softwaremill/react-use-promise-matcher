## [1.4.2]

- Added manual retry option and tryCount to usePromiseWithInterval

## [1.4.1]

- README.md update: contents list, more concise feature description

## [1.4.0]

- Chainable callback methods added: `onResolved`, `onRejected`, `onIdle`, and `onLoading`
- Added a `usePromiseWithInterval` hook for repetitive polling

## [1.3.2]

- Added flatMap function to PromiseResultShape api
- Migrated to GitHub Actions

## [1.3.1]

-   Updated documentation

## [1.3.0]

-   BREAKING CHANGE: Removed `usePromiseWithArguments` - the functionality of both is now contained in `usePromise`.
-   BREAKING CHANGE: Removed config object from `usePromise` arguments list (there was just `autoLoad` flag at this point)
-   Safe state handling within the hook - avoiding "Warning: Can't perform a React state update on an unmounted component." error in the situation where Promise resolves after the component was unmounted.
-   Upgraded @testing-library dependencies
-   Removed usages of deprecated `waitForElement` in tests

## [1.2.1]

-   Added helper type-guard functions for asserting PromiseRejected and PromiseResolved types in order to access the values directly.

## [1.2.0]

-   Changed the return value of the hooks from object to array.

## [1.1.0][corrupted]

## [1.0.8]

-   Wrapped loading functions in useCallback

## [1.0.7]

-   Corrected commonjs build configuration so that tests in Jest in projects importing the library won't fail

## [1.0.6]

-   Updated build configuration

## [1.0.5]

-   Updated documentation.

## [1.0.4]

-   Added CommonJS output file.

## [1.0.3]

-   Updated documentation.

## [1.0.2]

-   Deploy to npm

## [1.0.1]

-   [corrupted] Deployed to npm in previous removed publishment

## [1.0.0]

-   [corrupted] Deployed to npm in previous removed publishment

## [0.2.2]

-   Simplified rollup config
-   Updated rollup config - removed building umd module

## [0.2.1]

-   Project configuration updates - migrated from webpack to rollup

## [0.2.0]

-   Fixed bug with hook entering a re-render loop when config was passed to usePromise
-   Removed 'P extends object' type constraint for loader function argument type in usePromiseWithArguments
-   Added a "clear" funtion to the object returned by the hooks.
-   Updated README

## [0.1.0]

-   Initial version
