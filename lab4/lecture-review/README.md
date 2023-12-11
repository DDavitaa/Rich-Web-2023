# ANSWERS

1. Explain using code examples what is meant by props and state in
React JS?
- In React, props and state are two core concepts that you use to manage data in your components.  

    - Props (properties) are a way of passing data from parent components to child components. They are read-only and should not be modified by the child component.  
    In this example, the ParentComponent passes the prop name with the value "John" to the ChildComponent. The ChildComponent then uses this prop to render a greeting.

        ```js
        // Parent component
        const ParentComponent = () => {
        return <ChildComponent name="John" />;
        };

        // Child component
        const ChildComponent = (props) => {
        return <h1>Hello, {props.name}</h1>;
        };
        ```  
        <br/>

    - State is a way of managing data that can change over time and affect your component's rendering. State is managed within the component and can be changed using the setState function (in class components) or the useState hook (in functional components).  
    In this example, the Counter component has a state variable count that starts at 0. When the button is clicked, the setCount function is called to increment the count state, which triggers a re-render of the component with the updated count.

        ```JS
        // Functional component with state
        const Counter = () => {
        const [count, setCount] = React.useState(0);

        return (
            <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            </div>
        );
        };
        ```  
    <br />
    <br />
    
