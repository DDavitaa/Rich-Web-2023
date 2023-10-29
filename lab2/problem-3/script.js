
const pImage = document.getElementById('pImage');
const pName = document.getElementById('pName');
const pUsername = document.getElementById('pUsername');
const pEmail = document.getElementById('pEmail');
const pLoc = document.getElementById('pLoc');
const pGists = document.getElementById('pGists');

const input = document.getElementById('searchInput');
const btn = document.getElementById('searchBtn');
const error = document.getElementById('error');

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
        gists: public_gists
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
    }
}

function runSearch(username)
{
    getUserData(username)
    .then(userdata => {
        validateUserData(userdata);
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