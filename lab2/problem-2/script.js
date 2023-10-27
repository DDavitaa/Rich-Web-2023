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

        // Task 2
        const wordFrequency = json.flatMap(post => post.body.split(/\W+/))
            .reduce((freqMap, word) => ({
                ...freqMap,
                [word]: (freqMap[word] || 0) + 1
            }), {});
        console.log("task 2:", wordFrequency);
    })