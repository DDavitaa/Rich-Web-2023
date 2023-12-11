# ANSWERS

## 1. Explain using code examples what is meant by props and state in React JS?
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

        ```js
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
    
## 2. In functional programming, what does the term functor mean? Can you give an example in JavaScript?
- In functional programming, a Functor is a type that implements a map method. The map method takes a function as an argument and applies it to the values in the Functor, returning a new Functor. In JavaScript, arrays are a common example of a Functor.  
In this example, array is a Functor because it has a map method. We define a function addOne that adds one to its input. We then use the map method to apply addOne to every element in array, resulting in a new array where every element is one greater than the corresponding element in the original array.

    ```js
    const array = [1, 2, 3]; // functor

    const addOne = (x) => x + 1; // function

    const newArray = array.map(addOne); // apply the function to the Functor

    console.log(newArray); // output: [2, 3, 4]
    ```
<br />
<br />

