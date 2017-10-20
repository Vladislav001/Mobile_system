// Модуль результатов теста студентов
var firebase = require('firebase');

exports.post = function(req, res, next) {

  var updateEmailStudent = req.body.updateEmailStudent;

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
    var refStudents = firebase.database().ref("Users/" + req.params.idTag);

     var refStudents = refStudents.update({
       email: updateEmailStudent
     });

    }
  });

//Для обновления страницы - костыль
res.redirect("/personalArea");
};



exports.get = function(req, res) {


  firebase.auth().onAuthStateChanged(user => {
   if (user) {

    var refStudents = firebase.database().ref("Users/" + req.params.idTag);

     refStudents.once("value")
      .then(function(snapshot) {
        var emailStudent = snapshot.child('email').val();
        var currentQuestion = snapshot.child("current_question").val();

           res.render("resultTest", {
               emailStudent: emailStudent,
               id: snapshot.key,
               currentQuestion: currentQuestion
           });
     });
    }
  });
};
