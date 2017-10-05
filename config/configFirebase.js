var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBp77uO9nPjY8yGwjeBCuB2DFdsIL8Xpg8",
    authDomain: "mobilesystem-df40d.firebaseapp.com",
    databaseURL: "https://mobilesystem-df40d.firebaseio.com",
    projectId: "mobilesystem-df40d",
    storageBucket: "mobilesystem-df40d.appspot.com",
    messagingSenderId: "855414029476"
  };
var configFirebase = firebase.initializeApp(config);
//module.exports.configFirebase = configFirebase.database(); //this doesnt have to be database only
module.exports.configFirebase = configFirebase; // 2.07.17
