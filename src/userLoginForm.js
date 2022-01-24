/**
 * Sanizatize user data
 * @param input - the string that needs to be sanitized
 * @returns the appriopriate error message
 * @author: Julia Drozdz
 */
const getErrorMessage = (input) => {
  let error = "";
  // Remove spaces
  if (input === "") {
    error = `Name cannot be an empty string.`;
  }
  if (input.match(/[<>'`"/?%;()&+-]/g)) {
    error = `Your name cannot contain any of the following characters: \`<>'\"/?%;()&+-`;
    return error;
  }
  if (input.length > 20) {
    error = "Length cannot exceed 20 characters";
    return error;
  }
  return error;
};
/**
 * Sanitize the data, set the local storage variable for the other variables and redirect the user to the customization page
 *
 * @author: Julia Drozdz
 */
const logInUser = async (e) => {
  // disable automatic reload
  e.preventDefault();
  let customizePageURL =
    "https://users.aber.ac.uk/jud28/CS25320/coursework/BitHigher/customize.html";
  // getElementsByName returns an array, the first index is the username
  let username = document.getElementsByName("username")[0].value;
  // Remove spaces from input
  username = username.replace(/\s/g, "");

  // Error
  let errorMessage = getErrorMessage(username);
  let errorElement = document.querySelector(".error");
  errorElement.innerText = "";
  errorElement.innerText = errorMessage;

  if (!errorMessage) {
    window.localStorage.setItem("username", username);
    let data = await fetchUser(
      "https://users.aber.ac.uk/jud28/CS25320/coursework/BitHigher/api/readUser.php"
    );

    // Check if the user exists
    if (username === data.name) {
      window.location.href = customizePageURL;
    } else {
      // create a new user
      let data = await createUser(
        "https://users.aber.ac.uk/jud28/CS25320/coursework/BitHigher/api/createUser.php"
      );
      window.location.href = customizePageURL;
    }
  }
};

/**
 * After clicking login in the login functionality will run:
 * input sanitization, finding the user in the database or creating a new one
 */
document.getElementById("login-button").addEventListener("click", logInUser);
