var firebase = require('firebase');
var configFirebase = require ('../config/configFirebase');
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;


exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
  var email = req.body.email; // P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
  var password = req.body.password; // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные


  //Входим
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  //[START_EXCLUDE]
  if (errorCode === 'auth/wrong-password') {
      console.log('Wrong password.');
      return next(new HttpError(403, error.message)); //403 - отказ регистрации
  } else {
      console.log(errorMessage + "errorMessage");
      return next(new HttpError(403, error.message)); //403 - отказ регистрации
  }
  console.log(error + "error");

//unsubscribe ();
});
//Для обновления страницы(перехода в лк) - костыль
//  firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     res.redirect("/personalArea");}
// });

}




exports.get = function(req, res) {
  res.render('login');
};
