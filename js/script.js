//Variable to select "overview" class div, where profile information will appear
const overview = document.querySelector(".overview"); 

const username = "ollie-grove"; 

//Async function to fetch information from GitHub profile. Target the "users" endpoint and use temperate literal to add the global username variable to the endpoint. 

const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${ollie-grove}`); 

    const data = await userInfo.json();
    
};

console.log(gitUserInfo); 


//Function to display the fetched user information on the page. Should accept the json data as a parameter.

const displayUserInfo = function (data) {
    const div = document.createElement(".user-info"); 
    div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${}</p>
    <p><strong>Bio:</strong> ${}</p>
    <p><strong>Location:</strong> ${}</p>
    <p><strong>Number of public repos:</strong> ${}</p>
  </div> `

}