var firebase = require ('firebase');

exports.post = function(req, res) {
  firebase.auth().signOut();
  //req.session.destroy(); // уничтожить сессию
   res.redirect('/'); // перенаправить посетителя на главную
};
