
// getting elements
const input = document.getElementById('searchInput');
const btn = document.getElementById('searchBtn');
const error = document.getElementById('error');

const pImage = document.getElementById('pImage');
const pName = document.getElementById('pName');
const pUsername = document.getElementById('pUsername');
const pEmail = document.getElementById('pEmail');
const pLoc = document.getElementById('pLoc');
const pGists = document.getElementById('pGists');

const reposContent = document.getElementById('reposContent');

var repoTemplateShow = 1;
repoTemplate();

// repo list template
function repoTemplate(nameRepo,descRepo)
{
    // creating elements
    const repo = document.createElement('div');
    repo.setAttribute('class', 'repo');
    
    const repoDetail1 = document.createElement('div');
    repoDetail1.setAttribute('class', 'repoDetail');
    repoDetail1.innerHTML = "Name: ";
    
    const repoDetail2 = document.createElement('div');
    repoDetail2.setAttribute('class', 'repoDetail');
    repoDetail2.innerHTML = "Description: ";
    
    const repoName = document.createElement('div');
    repoName.setAttribute('id', 'rName');

    // if the name of the repo has a value, show the name of the repo
    if(nameRepo != null)
    {
        repoName.innerHTML = nameRepo;
    }
    
    const repoDesc = document.createElement('div');
    repoDesc.setAttribute('id', 'rDesc');

    // if the initial repo template is shown, set the variable to 0 and show the description of the repo next time
    if(repoTemplateShow == 1)
    {
        repoTemplateShow = 0;
    }
    else
    {
        repoDesc.innerHTML = descRepo;
    }
    
    // appending elements
    repo.appendChild(repoDetail1);
    repoDetail1.appendChild(repoName);

    // if the name of the repo is null, add the break tag
    if(nameRepo == null)
    {
        const br = document.createElement('br');
        repoDetail1.appendChild(br);
    }

    repo.appendChild(repoDetail2);
    repoDetail2.appendChild(repoDesc);
    reposContent.appendChild(repo);
}


// function to get user data
async function getUserData(username) 
{
    const response = await fetch(`https://api.github.com/users/${username}`);
    const userdata = await response.json();
    const { avatar_url, name, login, email, location, public_gists } = userdata;
    
    // returns promise
    return {
        avatar: avatar_url,
        name: name || login,
        username: login,
        email: email || 'N/A',
        location: location || 'N/A',
        gists: public_gists || 'N/A'
    };
}

function validateUserData(userdata)
{
    // if the username is null, show the error message
    if(userdata.username == null)
    {
        pImage.src = "";
        pName.innerHTML = "";
        pUsername.innerHTML = "";
        pEmail.innerHTML = "";
        pLoc.innerHTML = "";
        pGists.innerHTML = "";
        error.style.display = 'block';
    }
    else // if the username is not null, show the user data
    {
        pImage.src = userdata.avatar;
        pName.innerHTML = userdata.name;
        pUsername.innerHTML = userdata.username;
        pEmail.innerHTML = userdata.email;
        pLoc.innerHTML = userdata.location;
        pGists.innerHTML = userdata.gists;
        error.style.display = 'none';
    }
}

// function to get repo data
async function getRepoData(username)
{
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repodata = await response.json();
    const repos = repodata.map(repo => ({ name: repo.name, description: repo.description || 'N/A'}));

    // returns promise
    return repos;
}

// function to add repos to the repo list
function repoList(repos)
{
    // clear the repo list
    reposContent.innerHTML = "";

    // add the repos to the repo list
    repos.forEach(repoblock => {
        repoTemplate(repoblock.name, repoblock.description);
    });

    // if the number of repos is greater than 5, add the scroll bar
    if(repos.length > 5)
    {
        reposContent.style.overflowX = "hidden";
        reposContent.style.overflowY = "scroll";
    }
    else
    {
        reposContent.style.overflowX = "visible";
        reposContent.style.overflowY = "visible";
    }
}

// function to run the search
function runSearch(username)
{
    // get user data
    getUserData(username)
    .then(userdata => {
        // validate user data
        validateUserData(userdata);
        
        // get repo data
        getRepoData(username)
            .then(repos => {
                // add repos to the repo list
                repoList(repos);
            })
            .catch(error2 => {
                console.error(error2);
            });
        
    })
    .catch(error => {
        console.error(error);
    });
}

// event listener for search button
btn.addEventListener('click', () => {
    const username = input.value;
    
    runSearch(username);
});

// event listener for enter key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btn.click();
    }
});
