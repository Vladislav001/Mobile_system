var firebase = require('firebase');
var configFirebase = require('../config/configFirebase');
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
  var email = req.body.email; // P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
  var password = req.body.password; // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      console.log('The password is too weak.');
      return next(new HttpError(403, error.message)); //403 - отказ регистрации
    } else {
      console.log(errorMessage + "errorMessage");
      return next(new HttpError(403, error.message)); //403 - отказ регистрации
    }
    console.log(error + "error");
    // [END_EXCLUDE]
  });

  var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;

      var ref = firebase.app().database().ref();
      var usersRef = ref.child('administrations/' + userId);
      // Create a new ref and log it’s push key
      //var userRef = usersRef.push();

      // Create a new ref and save data to it in one step
      var userRef = usersRef.set({
        email: email,
        password: password
      });


      // Формируем узлы с номерами тестов и соответствующими под-узлами
      var refNewTest = ref.child("test");
      var refNewTestSettings = refNewTest.child("/settings"); //
      var refNewTestManageButtons = refNewTest.child("/manage_buttons");//
      var refNewTestCategories = refNewTest.child("/categories");//
      //Для заполнения-посмотреть как выглядит в databaseьщ
      var refNewTestSettings = refNewTestSettings.set({
       text: "true",
       swap: "true",
       progress_bar: "true",
      });

      var refNewTestManageButtons = refNewTestManageButtons.set({
          style_images_swap_arrows: "0",
          style_images_like_dislike: "0",
          style_image_stop_test: "0"
         });

      unsubscribe(); // убирает состояние
    }
  });


}



exports.get = function(req, res) {

  res.render('registration');
};
