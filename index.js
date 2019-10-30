
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDMoXzV5-SCNyNK3lniSWPAhz8ob5avXys",
    authDomain: "todo-list-2c04e.firebaseapp.com",
    databaseURL: "https://todo-list-2c04e.firebaseio.com",
    projectId: "todo-list-2c04e",
    storageBucket: "todo-list-2c04e.appspot.com",
    messagingSenderId: "1081091653179",
    appId: "1:1081091653179:web:8b032e9cd2a250cf74261e",
    measurementId: "G-QEGT1NQWWJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

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

    addNewItem(postit_text);

    function saveItemToDatabase(postit_text){
      doc = (db.collection("tasks")

        //save tasks to database
        .add({
          mytask: postit_text
        })

        //then get the information sent to the database
        .then(
          function(docRef){
            docRef.get();
          }
        )

      );
    };

    saveItemToDatabase(postit_text);

    function clearInput(){
      document.getElementById("new-task").value ='';
    }
    clearInput();
});


// This chunk of code will run when the page is loaded
$(document).ready(function(){

   // Load data from database
   function loadTasksFromDatabase(){

       // Go to collection in database
       db.collection("tasks")

       // Get everything
       .get()

       // Then for each document in the collection
       .then(function(querySnapshot){
           querySnapshot.forEach(function(doc) {

               // Display post-it on task board
               addNewItem(doc.data()['mytask']);
           });
       });
   };
   loadTasksFromDatabase()
});
