//LINKS FIREBASE
var firebaseConfig = {
      apiKey: "AIzaSyBfCTdmgDaA4G-I3Yc058bzNpV7nhb8vgc",
      authDomain: "vamosconversar-83a2b.firebaseapp.com",
      databaseURL: "https://vamosconversar-83a2b-default-rtdb.firebaseio.com",
      projectId: "vamosconversar-83a2b",
      storageBucket: "vamosconversar-83a2b.appspot.com",
      messagingSenderId: "925076327214",
      appId: "1:925076327214:web:9b3bde33e4bd225a4d08bf"
    };
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

  function send()
  {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value = "";
  }
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
      console.log(firebaseMessageId);
      console.log(messageData)
      name = messageData['name']
      message =  messageData['message'];
      like = messageData['like']
      nameWithTag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
      messageWithTag = "<h4 class='message_h4>'" + message +"</h4>";
      likeButton ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'";
      spanWithTag = "<span class='glyphicon glyphicon-thumbs-up>Like: "+ like +"</span></button><hr>";

      row = nameWithTag + messageWithTag + likeButton + spanWithTag;
      document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function updateLike(messageId)
{
      console.log("botão like pressionado - " + messageId);
      button_id = messageId;
      likes = document.getElementById(button_id).value;
      updateLikes = Number(likes) + 1;
      console.log(updatedLikes);

      firebase.database().ref(room_name).child(messageId).update({
            like : updatedLikes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name")
      window.location = "index.html";
  }