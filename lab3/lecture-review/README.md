
## Questions

1. **Explain what is meant by the stream abstraction. What is the relationship between
streams and the observer pattern? What are streams useful for modeling and when
might you use them in Rich Web development?**  
- The stream abstraction is a sequence of data elements made available over time.  
The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes. Streams implement the observer pattern: the stream is the subject, and any observers are the consumers of the stream's data.  
Streams are useful for modeling asynchronous or event-based operations. They can represent anything from button clicks, mouse movements, and other user interactions to data coming in from a network request.  
In Rich Web development, you might use streams to handle user interactions, real-time data, or sequences of asynchronous operations. For example, you might use a stream to represent the user's mouse movements and then subscribe to this stream to update the UI in response to these movements.   
<br>

2. **Assume that you are building an interface to an API in your Rich Web App. Describe in
detail how you could use the RxJS library to handle asynchronous network responses to
API requests. In your opinion, what are the benefits to using a streams library for
networking over, say, promises? And what do you think are the downsides?**  
- To handle API requests, I would create an Observable that makes the API request using "ajax" or "fetch". When I subscribe to this Observable, the API request is made, and I will use appropriate functions to handle the response data and the completion of the request. An Error object is useful in the case of handling errors during the API request. As for transforming the data, I can use the "map" operator to extract values and use for the interface. 
 
   In my opinion, the benefits include:
    - Using a streams library like RxJS for networking over promises is that Observables are cancellable. If you no longer need the results of an API request, you are able cancel the request before it completes. This isn't possible with promises.  
    - Another benefit is that Observables can emit multiple values over time, which is very useful for handling multiple related API requests, or for real-time data.  
    - One more benefit is that RxJS provides a wide range of operators like map, filter, reduce, retry, and more that can be used to handle complex manipulation and combination of asynchronous data streams.  
  
   The downsides would be:  
    - That RxJS would be that it has a steeper learning curve than promises, as the RxJS concepts can be difficult to understand, and the API is more complex. 
    - Sometimes RxJS may be overkill for simple cases. If you're only dealing with a single asynchronous operation that doesn't need to be cancelled or transformed, using promises might be more straightforward.
    - Errors need to be handled in each subscription, whereas with promises, they can be handled in a single catch block.  
<br>

3. **Consider three asynchronous tasks, A,B & C. What are the consequences of these
functions sharing global state? What is a good practice to alleviate any problems
associated with this?**  
  
- The consequences of these functions sharing global state include:
    - If the tasks are modifying the global state, they might interfere with each other, leading to inconsistent state. This is because the order in which the tasks complete can be unpredictable.
    - Shared global state can make your code harder to understand and debug, as any function can modify the state at any time.
    - Functions that depend on global state can be harder to test in isolation, as they depend on the state of the entire application.  

    To alleviate problems associated with this would include:
    - Where possible, avoid using global state. Instead, pass state as parameters to functions or use local state within functions.
    - Making the global state immutable. Functions will return a new copy of the state with the changes applied instead of modifying the state directly.
    - Encapsulate state within objects or modules and provide functions to interact with it. This can help to control how and when the state is modified.
