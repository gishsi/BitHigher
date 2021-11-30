/**
 * Create a new user Fetch API call to the createUser.php file
 * @param url - php endpoint
 * @returns an error message if the database could not create a user, confirmation of a successful creation otherwise
 * @author: Julia Drozdz
 */
const createUser = async (url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "same-origin",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: localStorage.getItem("username") }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(`Could not fetch user: ${error}`);
  }
};
