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

## 3. We have looked at three kinds of asynchronous programming mechanisms, namely callbacks, promises and streams. Mention one advantage and one disadvantage of each type.
- **Callbacks:**

    Advantage:
    - Simple to understand and use, especially for simple cases.

    Disadvantage:
    - Can lead to "callback hell" when you have many nested callbacks, making the code hard to read and manage.  
    <br />
- **Promises:**

    Advantage:
    - They make asynchronous code easier to read and write by allowing you to chain asynchronous operations.

    Disadvantage:
    - Error handling can be tricky, as errors need to be caught at the end of the promise chain.  
    <br />
- **Streams:**

    Advantage:
    - They allow you to work with large amounts of data efficiently, as you don't need to load the entire data into memory at once.

    Disadvantage:
    - They can be more complex to understand and use, especially for beginners.  
<br />
<br />

## 4. With the aid of a diagram and example code, describe the Cascading Style Sheets (CSS) Box Model and show how it can be used to space DOM elements.
- The CSS Box Model is like a blueprint for how elements on a webpage should look and be arranged. It defines these elements as rectangular boxes, and guides how they should be placed and spaced out on the page. Each box has a content area (text, an image, etc.) and optional surrounding padding, border, and margin areas.

<p align="center">
    <img src="https://www.washington.edu/accesscomputing/webd2/student/unit3/images/boxmodel.gif">
</p>  

- The CSS Box Model can be used to space DOM elements by adjusting the padding, border, and margin properties.  
In this example, the div element will have a content width of 300px, a padding of 10px around the content, a border of 5px around the padding, and a margin of 20px around the border. The total width of the element, including padding, border, and margin, will be 370px (300px content + 210px padding + 25px border + 2*20px margin).
    
    ```css
    div {
        width: 300px;
        padding: 10px;
        border: 5px solid black;
        margin: 20px;
    }
    ```
<br />
<br />

## 5. Detail how the browser loads and bootstraps a rich web application from an initial URL.

- When a user enters a URL in the browser, the following steps occur to load and bootstrap a rich web application:

    1. The browser performs a DNS lookup to translate the domain name into an IP address.

    2. The browser sends an HTTP request to the server at the obtained IP address.

    3. The server responds with the requested files (HTML, CSS, JavaScript, etc.).

    4. The browser parses the HTML to create the Document Object Model (DOM) tree. During this process, the browser will also request additional resources referenced in the HTML file (like CSS and JavaScript files).

    5. The browser renders the page according to the DOM and CSSOM (CSS Object Model). JavaScript may also manipulate the DOM and CSSOM.

    6. It may make additional requests to the server (or other servers) to load data, and then dynamically update the page content.