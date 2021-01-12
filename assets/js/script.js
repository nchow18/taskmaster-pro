var tasks = {};

var createTask = function(taskText, taskDate, taskList) {
    // create elements that make up a task item
    var taskLi = $("<li>").addClass("list-group-item");
    //create span element
    var taskSpan = $("<span>")
        .addClass("badge badge-primary badge-pill")
        .text(taskDate);
    //create p element
    var taskP = $("<p>")
        .addClass("m-1")
        .text(taskText);

  // append span and p element to parent li
  taskLi.append(taskSpan, taskP);


  // append to ul list on the page
  $("#list-" + taskList).append(taskLi);
};

var loadTasks = function() {
  tasks = JSON.parse(localStorage.getItem("tasks"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!tasks) {
    tasks = {
      toDo: [],
      inProgress: [],
      inReview: [],
      done: []
    };
  }

  // loop over object properties
  $.each(tasks, function(list, arr) {
    // then loop over sub-array
    arr.forEach(function(task) {
      createTask(task.text, task.date, list);
    });
  });
};

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

//in class=list-group, when "p" is clicked, the function begins
$(".list-group").on("click", "p", function() {
    //text displays the text of "p" when "p" is clicked on
    var text = $(this)
        //.text() shows the text of "p"
        .text()
        //.trim() trims any white space before or after
        .trim();
    //textInput creates and replaces <textarea> within "p"
    var textInput = $("<textarea>")
        //adds a class of form-control to <textarea>
        .addClass("form-control")
        //.val returns or sets a new value of text within <textarea>, will add "p" text within
        .val(text);
        //the inner text of "this" is replaced with new text input from "textInput"
        $(this).replaceWith(textInput);
        //when textinput is selected, it will trigger a FOCUS
        textInput.trigger("focus");
    console.log(text);
});

//within .list-group class, when "span" is clicked, the fucntion will begin
$(".list-group").on("click", "span", function() {
  // get current text
  var date = $(this)
    //displays the text
    .text()
    //trims any whitespace before and after the text
    .trim();

  // create new input element
  var dateInput = $("<input>")
    //adds an attribute of type="text" in html
    .attr("type", "text")
    //adds a class of "form-control"
    .addClass("form-control")
    //sets and creates date into the created <input>
    .val(date);

  // swap out elements
  $(this).replaceWith(dateInput);

  // automatically focus on new element
  dateInput.trigger("focus");
});

// value of due date was changed(deselects the date)
$(".list-group").on("blur", "input[type='text']", function() {
  // get current text
  var date = $(this)
    .val()
    .trim();

  // get the parent ul's id attribute
  var status = $(this)
    .closest(".list-group")
    .attr("id")
    .replace("list-", "");

  // get the task's position in the list of other li elements
  var index = $(this)
    .closest(".list-group-item")
    .index();

  // update task in array and re-save to localstorage
  tasks[status][index].date = date;
  saveTasks();

  // recreate span element with bootstrap classes
  var taskSpan = $("<span>")
    .addClass("badge badge-primary badge-pill")
    .text(date);

    console.log(status);
    console.log(date);
    console.log(index);

  // replace input with span element
  $(this).replaceWith(taskSpan);
});

//blur on text area(unselected)
$(".list-group").on("blur", "textarea", function() {
    // get the textarea's current value/text
    var text = $(this)
        //sets and creates
        .val()
        //trims any white space before and after
        .trim();

    // get the parent ul's id attribute
    var status = $(this)
        //finds the closest element with .list-group in css
        .closest(".list-group")
        //adds an attribute of "id"
        .attr("id")
        //replaces "list-", with ""
        .replace("list-", "");

    // get the task's position in the list of other li elements
    var index = $(this)
        //finds closest .list-group-item in css
        .closest(".list-group-item")
        //index displays the "text"s current array #index to be selected and changed
        .index();

    //tasks is an object
    //tasks[status] returns the array of toDo
    //tasks[status][index] returns the object at the given index in the array
    //tasks[status][index].text returns the text property of the object at the given index
    tasks[status][index].text = text;
    saveTasks();

    //recreate p element
    var taskP = $("<p>")
        .addClass("m-1")
        .text(text);

    //replace textarea with p element
    $(this).replaceWith(taskP);
});

// modal was triggered
$("#task-form-modal").on("show.bs.modal", function() {
  // clear values
  $("#modalTaskDescription, #modalDueDate").val("");
});

// modal is fully visible
$("#task-form-modal").on("shown.bs.modal", function() {
  // highlight textarea
  $("#modalTaskDescription").trigger("focus");
});

// save button in modal was clicked
$("#task-form-modal .btn-primary").click(function() {
  // get form values
  var taskText = $("#modalTaskDescription").val();
  var taskDate = $("#modalDueDate").val();

  if (taskText && taskDate) {
    createTask(taskText, taskDate, "toDo");

    // close modal
    $("#task-form-modal").modal("hide");

    // save in tasks array
    tasks.toDo.push({
      text: taskText,
      date: taskDate
    });

    saveTasks();
  }
});

// remove all tasks
$("#remove-tasks").on("click", function() {
  for (var key in tasks) {
    tasks[key].length = 0;
    $("#list-" + key).empty();
  }
  saveTasks();
});

// load tasks for the first time
loadTasks();


