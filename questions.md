### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

Ans: A PureComponent (src/components/ListItem.tsx), is a component that will not rerender if the props and state do not change. Its mainly used for performance optimization. A normal component is generally used to render the jsx and it will rerender every time if the props or state changes. A PureComponent will break if the props is a nested object as it does shallow comparison.

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Ans: Context is used to pass data defined in a root component to its nested children. If a component implements ShouldComponentUpdate, it may not rerender always including its children. This will block the subscription to context API and these components will not correctly render even if the context value has changed.

### 3. Describe 3 ways to pass information from a component to its PARENT.

Ans: Below are the different ways we can pass information to a parent.

- Using a callback function defined in parent and pass it down to the child. The child component can then trigger this callback and pass data through it.
- Using a context api with a state. The child can subscribe this this context and update the state and the parent will have access to this.
- Using redux or any state management solution and use store as a single data point for both parent and child.

### 4. Give 2 ways to prevent components from re-rendering.

Ans: Two ways we can prevent components from re-rendering are

- Wrapping the component with a React.memo
- Making use of useMemo (memoize value) or useCallback (memoize function reference) which will prevent the component from unnecessary rerenders.

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

Ans: Fragments are used to group the elements without adding an extra element to the dom. We mainly use it in situations where we do not want to wrap the components with an extra HTML element just to group them as it may lead to styling issues and break the layout.

### 6. Give 3 examples of the HOC pattern.

Ans: Below are the 3 example of HOC pattern.

- `withErrorBoundary` in React error boundary
- `withTheme` in Styled components
- `withRouter` in React router

### 7. What's the difference in handling exceptions in promises, callbacks and async…await?

Ans: Callbacks do not have a built-in error handling mechanism. We could handle exceptions in them by passing proper errors back to the calling function. Promises have a catch block which we can use to handle exceptions if they get rejected. We mainly use try-and-catch block for async and await.

### 8. How many arguments does setState take and why is it async.

Ans: The setState in React class components takes two parameters that is the next state value and the callback. It is aysnc so that it can perform state update in batches.

### 9. List the steps needed to migrate a Class to Function Component.

Ans: Below are the few things we do to migrate a class component to function component.

- Covert class methods to a regular function. Remove use of `this` and `render` method.
- Remove constructor if have them to initialise state or bind methods and use useState hook to define a state.
- Replace lifecycle methods with useEffect hook.

### 10. List a few ways styles can be used with components.

    Ans: Below are the few ways we can apply styles to our components.

    - Use inline styles. We can define them as objects and pass it to the style prop.
    - Use a regular stylesheet and apply styles using classnames or id. We can also use css modules so that the styles are contained to a particular component.
    - CSS in JS using libraries like styled components, MUI etc.

### 11. How to render an HTML string coming from the server.

    Ans: We can use dangerouslySetInnerHTML to render HTML directly through a component. Below is the code snippet.
    `<div dangerouslySetInnerHTML={{ __html: htmlString }} />`
