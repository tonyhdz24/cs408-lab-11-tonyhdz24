window.onload = loaded;

/**
 * Simple Function that will be run when the browser is finished loading.
 */
function loaded() {
  // Assign to a variable so we can set a breakpoint in the debugger!
  const hello = sayHello();
  console.log(hello);
}

/**
 * This function returns the string 'hello'
 * @return {string} the string hello
 */
function sayHello() {
  return "hello";
}
// Back-End Code
const btnLoadAllItems = document.getElementById("btn-load-items");
const tableBody = document.getElementById("items-table-body");

btnLoadAllItems.onclick = function () {
  const newRow = document.createElement("tr");
  newRow.innerHTML = "<td></td><td></td><td></td><td></td>";

  const lastRow = tableBody.lastElementChild;

  tableBody.insertBefore(newRow, lastRow);
};

// Sending Data
document.getElementById("send-data").onclick = function () {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "PUT",
    "https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/items"
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      id: "6666666",
      price: 19,
      name: "test put value",
    })
  );
};

// Loading Data
document.getElementById("load-data").onclick = function () {
  let lambda = document.getElementById("lambda-info");
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    lambda.innerHTML = xhr.response;
  });
  xhr.open(
    "GET",
    "https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/items"
  );
  xhr.send();
};

// Deleting
document.getElementById("delete-data").onclick = function () {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "DELETE",
    "https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/items/6666666"
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
};
