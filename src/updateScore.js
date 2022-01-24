/**
 * Updates the score of the user
 * @param  url - the url of the endpoint
 * @param  user - user object
 * @returns true if the update was successful
 */
const updateScore = async (url, user) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "same-origin",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return true;
  } catch (error) {
    console.error(`Could not fetch user: ${error}`);
    return false;
  }
};
