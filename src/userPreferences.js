//  Customization page loaded listener that sets the  radio buttons checked values (from previous preferences)
document.addEventListener("DOMContentLoaded", () => {
  // Set the form elements to the data from the database
  setInitialData();
  // Preferences/customization form
  let form = document.getElementById("customization-form");
  form.addEventListener("submit", (e) => handleFormSubmit(e, form));
});

/**
 *  Update the user data and redirect to the game
 *
 * @author: Julia Drozdz
 */
const handleFormSubmit = async (e, form) => {
  e.preventDefault();
  let formData = new FormData(form);
  formData.append("username", localStorage.getItem("username"));
  // updateUser is a funciton from updateUser.js
  let isUpdated = await updateUser(
    "https://users.aber.ac.uk/jud28/CS25320/coursework/1bitHigher/api/updateUser.php",
    Object.fromEntries(formData)
  );
  if (isUpdated)
    window.location.href =
      "https://users.aber.ac.uk/jud28/CS25320/coursework/1bitHigher/game.html";
};

/**
 *  Sets the inital values from previous preferences set by the user
 *
 * @author: Julia Drozdz
 */
const setInitialData = async () => {
  let data = await fetchUser(
    "https://users.aber.ac.uk/jud28/CS25320/coursework/1bitHigher/api/readUser.php"
  );

  document.getElementById(data.hero).checked = true;
  document.getElementById(data.difficulty).checked = true;
};
