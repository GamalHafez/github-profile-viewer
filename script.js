const form = document.querySelector(".form");
const input = document.querySelector(".user-name");
const errorMessage = document.querySelector(".error-message");
const DATA = ["name", "followers", "bio", "avatar_url", "public_repos"];

const updateScreenData = (dataToUpdate, dataObject) => {
  for (let data of dataToUpdate) {
    const element = document.querySelector(`[data-name="${data}"]`);
    const userData = dataObject[data];

    if (data === "avatar_url") {
      element.setAttribute("src", userData);
      element.style.display = "block";
    } else {
      element.textContent = userData || "Not available";
    }
  }
};

function clearScreenData(dataToUpdate) {
  for (let data of dataToUpdate) {
    const element = document.querySelector(`[data-name="${data}"]`);
    if (data === "avatar_url") {
      element.setAttribute("src", "");
      element.style.display = "none";
    } else {
      element.textContent = "";
    }
  }
}

async function fetchUserData(userName, dataToUpdate) {
  try {
    const response = await fetch(`https://api.github.com/users/${userName}`);

    if (!response.ok) throw new Error(`User name is not Available`);

    const dataObject = await response.json();
    updateScreenData(dataToUpdate, dataObject);
    errorMessage.textContent = "";
  } catch (error) {
    errorMessage.textContent = error.message;
    clearScreenData(dataToUpdate);
  }
}

const formHandler = (event, dataToUpdate) => {
  event.preventDefault();

  const userName = input.value.trim();

  fetchUserData(userName, dataToUpdate);
};

form.addEventListener("submit", (event) => formHandler(event, DATA));
