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

function addRoom()
{
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose : "adding room name"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "kwitterPage.html";
}

function getData() { 
    firebase.database().ref("/").on('value', function(snapshot)
    {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot)
        {
            childKey = childSnapshot.key;


            roomNames = childKey;
            console.log("Room Name -" + roomNames);
            row = "<div class='room_name' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
            document.getElementById("output").innerHTML += row; 
        });
    });
}

getData();

function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("room_name", name)
    window.location = "kwitterPage.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name")
    window.location = "index.html";
}