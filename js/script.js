//Variable to select "overview" class div, where profile information will appear

const overview = document.querySelector(".overview"); 

const username = "ollie-grove"; 

const repoList = document.querySelector(".repo-list"); 

const allRepos = document.querySelector(".repos"); 

const repoData = document.querySelector(".repo-data"); 

//Async function to fetch information from GitHub profile. Target the "users" endpoint and use temperate literal to add the global username variable to the endpoint. 

const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`); 

    const data = await userInfo.json();
    //console.log(data); 
    displayInfo(data); 
    
};

gitUserInfo();

//Function to display the fetched user information on the page. Should accept the json data as a parameter.

const displayInfo = function (data) {
    const div = document.createElement("div"); 
    div.classList.add("user-info"); 

    div.innerHTML = `
        <figure>
            <img alt = "user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong>${data.name}</p>
            <p><strong>Bio:</strong>${data.bio}</p>
            <p><strong>Location:</strong>${data.location}</p>
            <p><strong>Number of public repos:</strong>${data.public_repos}</p>
        </div>
    `;
    overview.append(div);
    gitRepos(); 
     
};

//Function to fetch repos. Find the parameters to sort repos by most recently updated to least updated (sort=updated), show up to 100 repos per page at a time(&per_page=100)

const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json(); 
    //console.log(repoData); 
    displayRepos(repoData);
}; 


//Display info about each repo. Use repos as a parameter so the function accepts the data returned from the last API call. Inside the function, loop and create a list item for each repo and give each item a class of repo and an h3 element. 
const displayRepos = function(repos) {
    for (repo of repos) {
        const repoItem = document.createElement("li"); 
        repoItem.classList.add("repo"); 
        repoItem.innerHTML = `<h3>${repo.name}</h3>`; 
        repoList.append(repoItem); 
    }
};

//Add an event listener called repoList for a click event on the unordered list with a class of "repo-list." Add a conditional statement to check if the event target matches the h3 element (name of the repo). In the conditional statement, create variable called repoName to target the innerText where the event happns. Log out the variable to the console. 


repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText; 
        getRepoInfo(repoName); 
        }
    }); 

const getRepoInfo = async function(repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`); 
    const repoInfo = await fetchInfo.json(); 
    //console.log(repoInfo); 

    //grab languages

    const fetchLanguages = await fetch(repoInfo.languages_url); 
    const languageData = await fetchLanguages.json(); 
    
    //list of language - Add each language to an empty array called "languages", the languageData is an oject, you'll want to add the languages to the end of the array.

    const languages = []; 
    for (const language in languageData) {
        languages.push(language); 
    }

    displayRepoInformation(repoInfo, languages); 
};

//Function to display the specific repo information, should accept both parameters "repoInfo" and "languages". Inside the function, empty the html of the section class "repo-data" where the individual repo data will appear. Create a new div element and add the selected repository's name, description, default branch, and link to its code on GitHub. 

const displayRepoInformation = function (repoInfo, languages) {
    repoData.innerHTML = ""; 
    repoData.classList.remove("hide"); 
    allRepos.classList.add("hide"); 

    const div = document.createElement("div"); 
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>
    `;
    repoData.append(div); 

};

