function checkTitle(post) {
    const words = post.title.split(" ");
    return words.length > 6;
}

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
        
        // Task 1
        const filteredPosts = json.filter(checkTitle);
        console.log("task 1:", filteredPosts)

    })