// Модуль результатов теста студентов
var firebase = require('firebase');

exports.post = function(req, res, next) {

  var updateLoginStudent = req.body.updateLoginStudent;
  var updatePasswordStudent = req.body.updatePasswordStudent;
  var updateNameStudent = req.body.updateNameStudent;
  var updateAgeStudent = req.body.updateAgeStudent;
  var updateGenderStudent = req.body.updateGenderStudent;
  var updateCurrentTest = req.body.updateCurrentTest;
  var updateCurrentResult = req.body.updateCurrentResult;

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
    var refStudents = firebase.database().ref("students/" + req.params.idTag);

     var refStudents = refStudents.update({
       login: updateLoginStudent,
       password: updatePasswordStudent,
       name: updateNameStudent,
       age: updateAgeStudent,
       gender: updateGenderStudent,
       current_test: updateCurrentTest,
       current_result_web: updateCurrentResult
     });

    }
  });

//Для обновления страницы - костыль
res.redirect("/personalArea");
};



exports.get = function(req, res) {

  var countResults;
  var countQuestionsInResult = [];

  firebase.auth().onAuthStateChanged(user => {
   if (user) {

    var refStudents = firebase.database().ref("students/" + req.params.idTag);

     refStudents.once("value")
      .then(function(snapshot) {
        var loginStudent = snapshot.child('login').val();
        var nameStudent = snapshot.child('name').val();
        var genderStudent = snapshot.child('gender').val();
        var ageStudent = snapshot.child('age').val();
        var passwordStudent = snapshot.child('password').val();
        var currentTest = snapshot.child('current_test').val();
        var currentResult = snapshot.child('current_result_web').val();

        var link = "/" + currentTest + "/test_settings/id" + req.params.idTag;

       var refNumbersResults = refStudents.child("/student_state");
       var refResultStudents = refStudents.child("tests/" + currentTest + "/results/" + currentResult);
       var refCurrentQuestion = refStudents.child("/student_state");

       refNumbersResults.once("value").then(function(snapshotNumbersResults) {
         var numbersResults = snapshotNumbersResults.child('current_result').val();

        refCurrentQuestion.once("value")
         .then(function(snapshotState) {
           var currentQuestion = snapshotState.child('current_question').val();
           var currentState = snapshotState.child('state').val();

           res.render("resultTest", {
               loginStudent: loginStudent,
               nameStudent: nameStudent,
               genderStudent: genderStudent,
               ageStudent: ageStudent,
               passwordStudent: passwordStudent,
               currentTest: currentTest,
               currentResult: currentResult,

               id: snapshot.key,
               link: link,

               numbersResults: numbersResults,
               currentQuestion: currentQuestion,
               currentState: currentState
           });
         });

      });
     });
    }
  });
};
