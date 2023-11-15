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

  function send(){
    msg=document.getElementById("msg").value;
    firebase.database().ref(roomname).push({
      name:username,
      message:msg,
      like:0
    });

    document.getElementById("msg").value="";
  }

  function getData(){
    firebase.database().ref("/" + roomname).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot){
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose"){
                firebase_message_id = childKey;
                message_data = childData;

                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag ="<h4> "+ name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span></button><hr>"; 

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
          } 
        });
    });
  }

  getData();

  function updateLike(message_id){
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    update_likes=Number(likes)+1;

    firebase.database().ref(roomname).child(message_id).update({
      like:update_likes
    });
  }

  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");    
  }

  function roomChange(){
    localStorage.removeItem("room_name");
    window.location.replace("kwitter_room.html");
  }