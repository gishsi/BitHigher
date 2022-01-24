// Check if the user is logged in, if they are, log in, if they are not, redirect to the main page
if (!window.localStorage.getItem("username")) {
  window.location.href =
    "https://users.aber.ac.uk/jud28/CS25320/coursework/BitHigher/";
}
