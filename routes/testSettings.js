// Модуль авторизации
var firebase = require('firebase');

exports.post = function(req, res, next) {

  var checkText = Boolean(req.body.checkText);
  checkText = String(checkText);
  var checkSwap = Boolean(req.body.checkSwap);
  checkSwap = String(checkSwap);
  var checkProgressBar = Boolean(req.body.checkProgressBar);
  checkProgressBar = String(checkProgressBar);

  var styleImagesLikeDislike = req.body.styleImagesLikeDislike;
  var styleImagesSwap = req.body.styleImagesSwap;
  var styleImageStopTest = req.body.styleImageStopTest;

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      //var refStudents = firebase.database().ref("students/" + "TnC8UsZuj5TBPJP4ckVhgV5qQle2/");
      var refTest = firebase.database().ref("test/");

      refTest.once("value")
        .then(function(snapshot) {

          //Формируем узлы с номерами тестов и соответствующими под-узлами
          var refNewTest = refTest.child("test/");
          var refNewTestSettings = refTest.child("/settings");
          var refNewTestManageButtons = refTest.child("/manage_buttons");

          var refNewTestSettings = refNewTestSettings.update({
            text: checkText,
            swap: checkSwap,
            progress_bar: checkProgressBar
          });


          var refNewTestManageButtons = refNewTestManageButtons.update({
            style_images_swap_arrows: styleImagesSwap,
            style_images_like_dislike: styleImagesLikeDislike,
            style_image_stop_test: styleImageStopTest
          });


          //Для обновления страницы - костыль
          var linkTestSettings = "/test_settings";
          res.redirect(linkTestSettings);
        });
    }
  });

};

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var refTest = firebase.database().ref("test/"); // в ejs лежит в запросе id

      refTest.once("value")
        .then(function(snapshot) {

          var refTestSettings = refTest.child("/settings");
          var refTestManageButtons = refTest.child("/manage_buttons");


          refTestSettings.once("value")
            .then(function(snapshotSettings) {
              var checkText = snapshotSettings.child('text').val();

              var checkSwap = snapshotSettings.child('swap').val();
              var checkProgressBar = snapshotSettings.child('progress_bar').val();

              refTestManageButtons.once("value")
                .then(function(snapshotManageButtons) {
                  var styleImagesSwap = snapshotManageButtons.child('style_images_swap_arrows').val();
                  var styleImagesLikeDislike = snapshotManageButtons.child('style_images_like_dislike').val();
                  var styleImageStopTest = snapshotManageButtons.child('style_image_stop_test').val();

                  res.render("testSettings", {

                    checkText: checkText,
                    checkSwap: checkSwap,
                    checkProgressBar: checkProgressBar,

                    styleImagesSwap: styleImagesSwap,
                    styleImagesLikeDislike: styleImagesLikeDislike,
                    styleImageStopTest: styleImageStopTest
                  });

                });





            });



        });
    }
  });

};
