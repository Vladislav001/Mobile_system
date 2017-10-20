var firebase = require('firebase');

exports.post = function(req, res, next) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     firebase.database().ref("Users/" + req.params.idTag).remove();
    }
  });

};
