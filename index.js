//BOM elements
const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

// Elements for GPIO states and sensor reading
const stateElement1 = document.getElementById("state1");
const stateElement2 = document.getElementById("state2");
const stateElement3 = document.getElementById("state3");

const tempElement = document.getElementById("temp");
const humElement = document.getElementById("hum");
const presElement = document.getElementById("pres");

// Button Elements
const btn1On = document.getElementById('btn1On');
const btn1Off = document.getElementById('btn1Off');
const btn2On = document.getElementById('btn2On');
const btn2Off = document.getElementById('btn2Off');
const btn3On = document.getElementById('btn3On');
const btn3Off = document.getElementById('btn3Off');

// Database path for GPIO states
var dbPathOutput1 = 'board1/outputs/digital/2';
var dbPathOutput2 = 'board1/outputs/digital/13';
var dbPathOutput3 = 'board1/outputs/digital/14';

// Database references
var dbRefOutput1 = firebase.database().ref().child(dbPathOutput1);
var dbRefOutput2 = firebase.database().ref().child(dbPathOutput2);
var dbRefOutput3 = firebase.database().ref().child(dbPathOutput3);


// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

//Button Control Part

    //Update states depending on the database value
    dbRefOutput1.on('value', snap => {
        if(snap.val()==1) {
            stateElement1.innerText="ON";
        }
        else{
            stateElement1.innerText="OFF";
        }
    });
    dbRefOutput2.on('value', snap => {
        if(snap.val()==1) {
            stateElement2.innerText="ON";
        }
        else{
            stateElement2.innerText="OFF";
        }
    });
    dbRefOutput3.on('value', snap => {
        if(snap.val()==1) {
            stateElement3.innerText="ON";
        }
        else{
            stateElement3.innerText="OFF";
        }
    });

    // Update database uppon button click
    btn1On.onclick = () =>{
        dbRefOutput1.set(1);
    }
    btn1Off.onclick = () =>{
        dbRefOutput1.set(0);
    }

    btn2On.onclick = () =>{
        dbRefOutput2.set(1);
    }
    btn2Off.onclick = () =>{
        dbRefOutput2.set(0);
    }

    btn3On.onclick = () =>{
        dbRefOutput3.set(1);
    }
    btn3Off.onclick = () =>{
        dbRefOutput3.set(0);
    }


//Sensor Reading Part

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    var dbPathTemp = 'UsersData/' + uid.toString() + '/temperature';
    var dbPathHum = 'UsersData/' + uid.toString() + '/humidity';
    var dbPathPres = 'UsersData/' + uid.toString() + '/pressure';

    // Database references
    var dbRefTemp = firebase.database().ref().child(dbPathTemp);
    var dbRefHum = firebase.database().ref().child(dbPathHum);
    var dbRefPres = firebase.database().ref().child(dbPathPres);

    // Update page with new readings
    dbRefTemp.on('value', snap => {
      tempElement.innerText = snap.val().toFixed(2);
    });

    dbRefHum.on('value', snap => {
      humElement.innerText = snap.val().toFixed(2);
    });

    dbRefPres.on('value', snap => {
      presElement.innerText = snap.val().toFixed(2);
    });





  // if user is logged out
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}
