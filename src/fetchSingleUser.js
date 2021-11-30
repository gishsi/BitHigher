/**
 * Fetch the data of the user by the username stored in the localStorage
 * @param  url - php endpoint
 * @returns single user
 */
const fetchUser = async (url) => {
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
