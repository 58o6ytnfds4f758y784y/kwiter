
//AÑADE TUS ENLACES DE FIREBASE
var firebaseConfig = {
      apiKey: "AIzaSyBVsCkJrmyQ4Z3TxzDGHX3W-wRVIYgeECE",
      authDomain: "kwitter-acb59.firebaseapp.com",
      databaseURL: "https://kwitter-acb59-default-rtdb.firebaseio.com",
      projectId: "kwitter-acb59",
      storageBucket: "kwitter-acb59.appspot.com",
      messagingSenderId: "273920948557",
      appId: "1:273920948557:web:a2d7f85faaa5715261df04"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

username=localStorage.getItem("user_name");
roomname=localStorage.getItem("room_name");
document.getElementById("user_name").innerHTML="Hola "+username;

function addroom(){
      roomname=document.getElementById("room_name").value;
      firebase.database().ref("/").child(roomname).update({
            proposito: "add sala"
      });
      localStorage.setItem("room_name" , roomname);
      window.location.replace("kwitterpage.html");
}

function getData() {
      firebase.database().ref("/").on('value', function(snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function(childSnapshot) {
                  childKey  = childSnapshot.key;
       Room_names = childKey;
      //Inicio del código
      console.log(Room_names);
      row ="<div class='room_name' id="+Room_names+" onclick='RedirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML += row;
      //Final del código
      });});}
getData();

function RedirectToRoomName(name){
      localStorage.setItem("room_name",name);
      window.location.replace("kwitterpage.html");
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}