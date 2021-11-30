/**
 * Update the user's preferences with the form data
 * @param  url
 * @param preferences - user preferences (form data)
 * @returns
 */
const updateUser = async (url, preferences) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "same-origin",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });

    return true;
  } catch (error) {
    console.error(`Could not fetch user: ${error}`);
    return false;
  }
};
