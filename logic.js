const form = document.getElementById('github-form');
const usernameInput = document.getElementById('username-input');
const repoList = document.getElementById('repo-list');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevens default form submission

  const username = usernameInput.value;
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => {
      if (response.ok) {
        return response.json(); //coverts data to json format
      } else {
        throw new Error('No public repositories found.');
      }
    })
    .then((data) => {
      repoList.innerHTML = ''; // Clear previous results

      if (data.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No public repositories found.';
        repoList.appendChild(listItem);
      } else {
        data.forEach((repo) => {
          const listItem = document.createElement('li');
          listItem.textContent = repo.name;
          repoList.appendChild(listItem);
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      repoList.innerHTML = 'An error occurred. Please try again.';
    });
});

