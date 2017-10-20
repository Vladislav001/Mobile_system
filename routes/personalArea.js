// Модуль личного кабинета

var firebase = require('firebase'); //https://metanit.com/web/nodejs/4.10.php


exports.get = function(req, res) {

  var links = [];  // массив в котором будут храниться сформированные адреса профилей юзеров
	var emails = []; // хранит имена юзеров



  var unsubscribe = firebase.auth().onAuthStateChanged(user => {
    if (user) {

      //trainer
      var userId = firebase.auth().currentUser.uid;
      var ref = firebase.database().ref("administrations/" + userId);

      ref.once("value")
        .then(function(snapshot) {

          var refUsers = firebase.database().ref("Users");

          refUsers.on("child_added", function(snapshotUser) {
            links.push("result_test/id" + snapshotUser.key);
            emails.push(snapshotUser.child('email').val());
          });

            //Исправить как будут пользователи

              //  var refUsers = firebase.database().ref("users");
              //  var count_students = snapshot.child("count_students").val();
              //   refUsers.orderByChild("trainer_ID").equalTo(userId).on("child_added", function(snapshot) {
              //     //console.log(snapshot.key);
              //     links.push("result_test/id" + snapshot.key);
              //     logins.push(snapshot.child('login').val());
               //
              //   });

                    //Исправить как будут пользователи
                unsubscribe(); // убирает состояние
                res.render("personalArea", {
                    email: user.email,
                    emails: emails,
                    links: links,
                });

        });
    }

  });

};
