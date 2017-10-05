// Загружать юзера перед роутом
//var User = require('../models/user').User;

var firebase = require('firebase');


module.exports = function(req, res, next) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
      req.user = res.locals.user = user;
      next(); // идем дальше
   }

  });

};
