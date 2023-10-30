
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
    const repo = document.createElement('div');
    repo.setAttribute('class', 'repo');
    
    const repoDetail1 = document.createElement('div');
    repoDetail1.setAttribute('class', 'repoDetail');
    
    const repoDetail2 = document.createElement('div');
    repoDetail2.setAttribute('class', 'repoDetail');
    
    const repoName = document.createElement('div');
    repoName.setAttribute('id', 'rName');

    if(nameRepo != null)
    {
        repoName.innerHTML = nameRepo;
    }
    
    const repoDesc = document.createElement('div');
    repoDesc.setAttribute('id', 'rDesc');
    if(repoTemplateShow == 1)
    {
        repoTemplateShow = 0;
    }
    else
    {
        repoDesc.innerHTML = descRepo;
    }
    
    
    repo.appendChild(repoDetail1);
    repoDetail1.innerHTML = "Name: ";
    repoDetail1.appendChild(repoName);
    if(nameRepo == null)
    {
        const br = document.createElement('br');
        repoDetail1.appendChild(br);
    }
    repo.appendChild(repoDetail2);
    repoDetail2.innerHTML = "Description: ";
    repoDetail2.appendChild(repoDesc);
    
    reposContent.appendChild(repo);
}


// function to get user data
async function getUserData(username) 
{
    const response = await fetch(`https://api.github.com/users/${username}`);
    const userdata = await response.json();
    const { avatar_url, name, login, email, location, public_gists } = userdata;
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
    if(userdata.username == null)
    {
        pImage.src = "";
        pName.innerHTML = "";
        pUsername.innerHTML = "";
        pEmail.innerHTML = "";
        pLoc.innerHTML = "";
        pGists.innerHTML = "";
        error.style.display = 'block';
        return 0;
    }
    else
    {
        pImage.src = userdata.avatar;
        pName.innerHTML = userdata.name;
        pUsername.innerHTML = userdata.username;
        pEmail.innerHTML = userdata.email;
        pLoc.innerHTML = userdata.location;
        pGists.innerHTML = userdata.gists;
        error.style.display = 'none';
        return 1;
    }
}

async function getRepoData(username)
{
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repodata = await response.json();
    const repos = repodata.map(repo => ({ name: repo.name, description: repo.description || 'N/A'}));
    return repos;
}

function repoList(repos)
{
    var repoCount = 0;

    reposContent.innerHTML = "";

    repos.forEach(repoblock => {
        repoTemplate(repoblock.name, repoblock.description);
        repoCount++;
    });

    if(repoCount > 5)
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

function runSearch(username)
{
    getUserData(username)
    .then(userdata => {
        const validation = validateUserData(userdata);

        if(validation == 0)
        {
            
        }
        else
        {
            getRepoData(username)
            .then(repos => {
                repoList(repos);
            })
            .catch(error2 => {
                console.error(error2);
            });
        }
        
    })
    .catch(error => {
        console.error(error);
    });
}

btn.addEventListener('click', () => {
    const username = input.value;
    
    runSearch(username);
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btn.click();
    }
});

// getUserData('mojombo')
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.error(error);
//     });