var firstName = document.getElementById("firstnamebox");
var lastName = document.getElementById("lastnamebox");
var cityBox = document.getElementById("citybox");
var submit = document.getElementById("checkbox");
var output = document.getElementById("output");
var form = document.getElementById("form");
//starts the ID counter from 0, for each user ID logged
var userIdCounter = 0;
//the format for array of var myObj 
var tasks = [];

// logs the text information as a value into an array
var start = function(event) {
    event.preventDefault();
    var name1 = firstName.value;
    var name2 = lastName.value;
    var city1 = cityBox.value;
    
    //creates the array formate to be saved as
    var myObj = {
        firstname: name1,
        lastname: name2,
        city: city1
    };

    //begins display function
    display(myObj);
}

var display = function(myObj) {

    var listUserItemEl = document.createElement("li");
        listUserItemEl.setAttribute("user-id", userIdCounter)
    var userInfoEl = document.createElement("div");
        userInfoEl.innerHTML += "<p>First Name: " + myObj.firstname + "<br> Last Name: " + myObj.lastname + "<br> City: " + myObj.city + "<br></p>";
        listUserItemEl.appendChild(userInfoEl);

    //obj id is the same as the userIdCounter
    myObj.id = userIdCounter;
    //push my obj array into tasks array []
    tasks.push(myObj);
    //each completed form has a new ID
    userIdCounter++;

    console.log(myObj);
    console.log(myObj.firstname);

    //creates a key with a value of tasks as a string.
    localStorage.setItem("user", JSON.stringify(tasks));
    
}

submit.addEventListener("click", start);
