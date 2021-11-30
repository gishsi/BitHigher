/*
    A very similiar solution can be found on StackOverflow, however  I made this on my own and later on found this forum
    https://stackoverflow.com/a/29455096/14638818.
*/
/*
 *  Fetch the users
 *  @url  - the url of the php endpoint
 *  return - users array
 *  Author: Julia Drozdz
 */
const fetchUsers = async (url) => {
  try {
    let response = await fetch(url);
    let users = await response.json();
    return users;
  } catch (error) {
    // Lazy error handling, should be changed to something else
    console.log(`${error.message}`);
  }
};
/*
 *  Map the table header with the columns
 *  @table - which table to append the thead to
 *  @keys - keys of the object that has been fetched (these will be the attribute names from the database,
 *  values will be attributes themselves)
 * Author: Julia Drozdz
 */
const mapTableHeader = (table, keys) => {
  let thead = table.querySelector("thead");
  thead.innerHTML = "<tr></tr>";

  keys.forEach((key) => {
    let th = document.createElement("th");
    th.innerHTML = key;
    thead.querySelector("tr").appendChild(th);
  });
};
/*
 *  Map the table body
 *  @table - which table to append the thead to
 *  @values -  array of user objects
 * Author: Julia Drozdz
 */
const mapTableBody = (table, values) => {
  let tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  values.forEach((user) => {
    let tr = document.createElement("tr");
    Object.values(user).forEach((val) => {
      let td = document.createElement("td");
      td.innerHTML = val;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
};

/*
 *  Creata a new table with users if there are any users in the database
 *
 * Author: Julia Drozdz
 */
const createUsersTable = async (url, table) => {
  // fetch the users from the database
  const users = await fetchUsers(url);
  // No users in the database, message is returned
  if (users.message !== undefined) {
    let p = document.createElement("p");
    p.innerText = users.message;
    table.appendChild(p);
    return;
  }
  // map thead
  mapTableHeader(table, Object.keys(users[0]));
  // map tbody
  mapTableBody(table, Object.values(users));
};

// Get data and append the table after the DOM has been loaded (and images)
window.onload = createUsersTable(
  "https://users.aber.ac.uk/jud28/CS25320/coursework/1bitHigher/api/readScoreboard.php",
  document.getElementById("scoreboard")
);
