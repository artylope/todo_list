// Firebase config
var firebaseConfig = {
    apiKey: "AIzaSyC_EvkSEoRnUkwKNveHSotWSHz1UnWAPv0",
    authDomain: "todolist-225c3.firebaseapp.com",
    databaseURL: "https://todolist-225c3.firebaseio.com",
    projectId: "todolist-225c3",
    storageBucket: "todolist-225c3.appspot.com",
    messagingSenderId: "193558522421",
    appId: "1:193558522421:web:0d8bbb28b57dc575dddf7c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Connect to Firestore, which is our noSQL DB
var db = firebase.firestore();

// Add new task to the task board
function addNewItem(postit_text){
    // Create a new post-it element for the task board
    var new_postit = document.createElement("div");
    new_postit.classList.add("new_postit");

    // Create a post-it text element for the new post it
    var postit_text_elem = document.createElement("p");
    postit_text_elem.innerHTML = postit_text;

    // Place the post-it text on the post-it
    new_postit.appendChild(postit_text_elem);

    // Place the post-it on the task board
    document.getElementById("taskboard").appendChild(new_postit);
};

// This chunk of code will run when you press the submit button
$("#postit").submit(function(e) {
    e.preventDefault();
    console.log("Form submitted!")

    // Get the text on the post it note, this is our new task
    var postit_input = document.getElementById("new-task");
    var postit_text = postit_input.value;
    console.log("Text is:", postit_text)

    // Save new task to database
    function saveItemToDatabase(postit_text){
        doc = (db.collection("tasks")

               // Save new task to database
               .add({mytask: postit_text})

               // Then get the information sent to database
               .then(function(docRef){docRef.get()

                    // Extract text and display on task board
                    .then(function(doc){addNewItem(doc.data()['mytask']);})}))
    };
    saveItemToDatabase(postit_text);
});

//// This chunk of code will run when the page is loaded
//$(document).ready(function(){
//
//    // Load data from database
//    function loadTasksFromDatabase(){
//
//        // Go to collection in database
//        db.collection("tasks")
//
//        // Get everything
//        .get()
//
//        // Then for each document in the collection
//        .then(function(querySnapshot){
//            querySnapshot.forEach(function(doc) {
//
//                // Display post-it on task board
//                addNewItem(doc.data()['mytask']);
//            });
//        });
//    };
//    loadTasksFromDatabase()
//});
