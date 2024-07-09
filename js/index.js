document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("github-form");
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const userQuery = document.getElementById('search').value;
        searchGitHubUsers(userQuery);
    });
});

function searchGitHubUsers(query) {
    fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayUsers(data.items);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function displayUsers(users) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}'s avatar" width="50" height="50">
            <a href="#" onclick="fetchUserRepos('${user.login}')">${user.login}</a>
        `;
        userList.appendChild(userItem);
    });
}

function displayRepos(repos) {
    const reposList = document.getElementById("repos-list");
    reposList.innerHTML = '';
    repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(repoItem);
    });
}