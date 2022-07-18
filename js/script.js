//Variable to select "overview" class div, where profile information will appear

const overview = document.querySelector(".overview"); 

const username = "ollie-grove"; 

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
};
