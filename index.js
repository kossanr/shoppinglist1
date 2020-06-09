//STORE is an array whose items are
//object literals that represent list items.
//Despite STORE being CONST, the underlying array may be altered

const STORE = [
  { id: cuid(), name: "apples", checked: false },
  { id: cuid(), name: "oranges", checked: false },
  { id: cuid(), name: "milk", checked: true },
  { id: cuid(), name: "bread", checked: false },
];

function generateItemElement(item) {
  return `
    <li data-item-id="${item.id}"> 
      <span class="shopping-item js-shopping-item ${
        item.checked ? "shopping-item__checked" : ""
      }">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item) => generateItemElement(item));
  return items.join("");
}

function renderShoppingList() {
  //render the shopping list to the page in the DOM
  //for each items in the STORE, generate a string representing an <li> w/
  // - item name rendered as inner text
  // - the item's index in the STORE set as a data attribute on the <li>
  // - the item's checked state (true or false)
  //rendered as the presence or absence of .shopping-item__checked
  //Join together the individual item strings into one long string
  //Insert the <li>s string inside the .js-shopping-list <ul> in the DOM
  console.log("`renderShoppingList` ran");

  //insert that HTML into the DOM
  $(".shopping-list").html(generateShoppingItemsString(STORE));
}

function addItemToShoppingList(itemName) {
  console.log(` Adding '${itemName}' to shopping list`);
  STORE.push({ id: cuid(), name: itemName, checked: false });
}
function addNewItem() {
  //this function allows user to  add new item to list
  //listen for user to submit a new item to the shopping list
  //Add new item to STORE
  //Clear the value from the unput to make room for new items
  //re-render the shopping list
  $("#js-shopping-list-form").submit(function (event) {
    event.preventDefault();
    const newItemName = $("#shopping-list-entry").val();
    console.log(newItemName);
    $("#shopping-list-entry").val("");
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedItems(itemID) {
  console.log("Toggling checked property for item with id " + itemId);
  const item = STORE.find((item) => item.id === itemId);
  item.checked = !item.checked;
}

function getItemIdFromElement(item) {
  return $(item).closest("li").data("item-id"); // .attr('data-item-id')
}

function checkItem() {
  //this function allows user ability to check items off of list

  $(".shopping-list").on("click", ".shopping-item-toggle", (event) => {
    // when a user clicks the "check" button, this
    //toggles the checked off styling class found in CSS
    console.log("`checkItem` ran");
    const itemId = getItemIdFromElement(event.currentTarget);
    toggleCheckedItems(itemId);
    renderShoppingList();
  });
}
function deleteItem() {
  // this funtions allows user to delte items off of a list
  console.log("`deleteItem` ran");
}

function finalListFunction() {
  //final callback functions that is responsible for
  //activateing each individual function

  renderShoppingList();
  addNewItem();
  checkItem();
  deleteItem();
}

$(finalListFunction);
