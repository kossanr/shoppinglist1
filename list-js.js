//this function is responsible for allowing the user to add new item to list,
//checkoff list items, and delete items from a list
$(function () {
  // listen for form submission
  //'event' is the object representing the data
  $("#js-shopping-list-form").submit(function (event) {
    //event.preventDefault() stops default form submission
    event.preventDefault();

    //variable's value is set to get text value for the new item
    const listItem = $("#shopping-list-entry").val(); //is this the wrong id?
    // clear the value
    $("#shopping-list-entry").val("");

    $(".shopping-list").append(`<li>
      <span class="shopping-item">${listItem}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`);
  });
  //deletes items, as well as future items

  $(".shopping-list").on("click", ".shopping-item-delete", function (event) {
    //listen for clicks on delete button
    // using .on() becasue there may be dynamically generated elements in the future
    //.on() targets the specific event watched for ("click")

    $(this).parent().parent().remove();
    //.closest() identifies closest 'li' element (clicked) and removes it
  });

  //check off current items and future generated items

  $(".shopping-list").on("click", ".shopping-item-toggle", function (event) {
    // when a user clicks the "check" button, this
    //toggles the checked off styling class found in CSS
    console.log("hello");
    $(this)
      .parent()
      .parent()
      .children(".shopping-item")
      .toggleClass("shopping-item__checked");
  });
});
