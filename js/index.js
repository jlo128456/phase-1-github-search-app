document.addEventListener('DOMContentLoaded', function() {
    let searchType = 'users';  // Default search type
    const form = document.getElementById('github-form');
    const toggleButton = document.getElementById('toggle-search');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search').value;
        if (searchType === 'users') {
            searchGitHubUsers(query);
        } else {
            searchGitHubRepos(query);
        }
    });

    toggleButton.addEventListener('click', function() {
        searchType = (searchType === 'users') ? 'repos' : 'users';
        toggleButton.textContent = `Toggle Search: ${searchType === 'users' ? 'Repositories' : 'Users'}`;
        document.getElementById('search').placeholder = `Search GitHub ${searchType}...`;
    });
});

function searchGitHubUsers(query) {
    const url = `https://api.github.com/search/users?q=${query}`;
    fetchGitHubData(url);
}

function searchGitHubRepos(query) {
    const url = `https://api.github.com/search/repositories?q=${query}`;
    fetchGitHubData(url);
}

function fetchGitHubData(url) {
    fetch(url, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
    .then(response => response.json())
    .then(data => {
        if (url.includes('users')) {
            displayUsers(data.items);
        } else {
            displayRepos(data.items);
        }
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayUsers(users) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `<img src="${user.avatar_url}" width="50" height="50">
                              <a href="#" onclick="fetchUserRepos('${user.login}')">${user.login}</a>`;
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