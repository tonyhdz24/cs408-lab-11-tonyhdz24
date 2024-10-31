window.onload = loaded;

// Function to load all items when the page loads
function loaded() {
  loadAllItems();
}
// Selecting DOM elements for new item form and buttons
const itemID = document.getElementById("item-id");
const itemName = document.getElementById("item-name");
const itemPrice = document.getElementById("item-price");
const btnAddItem = document.getElementById("new-item-submit");
const btnLoadAllItems = document.getElementById("btn-load-items");
const tableBody = document.getElementById("items-table-body");

// Flag to prevent multiple loads of the items table
let isTableLoaded = false;

/**
 * Function to load all items from the database and display them in the table
 */
function loadAllItems() {
  console.log("Load all items");
  let xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object

  xhr.addEventListener("load", function () {
    const items = JSON.parse(xhr.response); // Parse response JSON to get items

    items.forEach((item) => {
      // For each item in database create a new row in the table
      const newRow = document.createElement("tr");
      newRow.innerHTML = `<td>${item.id}</td><td>${item.name}</td><td>$${item.price}</td><td><button data-id="${item.id}" class="item-delete">Delete</button></td>`;

      // Add the new row to the table before last row
      const lastRow = tableBody.lastElementChild;
      tableBody.insertBefore(newRow, lastRow);

      // Delete button event listener
      newRow.querySelector(".item-delete").onclick = function () {
        let xhr = new XMLHttpRequest();
        xhr.open(
          "DELETE",
          `https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/items/${item.id}`
        );
        console.log(`Item with ID ${item.id} deleted successfully.`);
        newRow.remove(); // Remove the row from the table
        xhr.setRequestHeader("Content-Type", "application/json");
        newRow.remove(); // Remove the row from the table
        xhr.send();
      };
    });
    isTableLoaded = true; // Mark the table as loaded to avoid duplicate loading
  });
  xhr.open(
    "GET",
    "https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/items"
  );
  xhr.send();
}

// Event listener for "Load All Items" button to populate the table with items
btnLoadAllItems.onclick = () => {
  // Check if table has already been loaded
  if (!isTableLoaded) {
    loadAllItems();
  } else {
    console.log("Table already loaded");
    alert("All Items already loaded");
  }
};

// Event listener for "Add Item" button to add a new item to the database and table
btnAddItem.onclick = function () {
  // Check if inputs are empty
  if (
    !itemID.value.trim() ||
    !itemName.value.trim() ||
    !itemPrice.value.trim()
  ) {
    alert("Please fill in all fields."); // Alert the user if any field is empty
    return; // Exit the function if validation fails
  }
  let xhr = new XMLHttpRequest();
  xhr.open(
    "PUT",
    "https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/items"
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  // Send item details from inputs as a JSON string
  xhr.send(
    JSON.stringify({
      id: itemID.value,
      price: parseInt(itemPrice.value),
      name: itemName.value,
    })
  );
  // After sending to the database add the new item to the table immediately
  const newRow = document.createElement("tr");
  newRow.innerHTML = `<td>${itemID.value}</td><td>${itemName.value}</td><td>$${itemPrice.value}</td><td><button data-id="${itemID.value}" class="item-delete">Delete</button></td>`;
  const lastRow = tableBody.lastElementChild;
  tableBody.insertBefore(newRow, lastRow);

  // Clear the input fields after adding the item
  itemID.value = "";
  itemPrice.value = "";
  itemName.value = "";

  // Delete button event listener
  newRow.querySelector(".item-delete").onclick = function () {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "DELETE",
      `https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/items/${this.dataset.id}`
    );
    console.log(`Item with ID ${this.dataset.id} deleted successfully.`);
    newRow.remove(); // Remove the row from the table
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
  };
};
