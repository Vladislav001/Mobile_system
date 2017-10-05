var HttpError = require('../error').HttpError;
var firebase = require('firebase');


module.exports = function(req, res, next) {

    firebase.auth().onAuthStateChanged(user => {
     if (!user) {

          return next(new HttpError(401, "You haven't got the authorisation"));
     }
    });
  next();
};
