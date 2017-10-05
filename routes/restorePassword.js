var firebase = require('firebase')

exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
  var email = req.body.email; // P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
                              // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные
  // Берем объект Auth
  var auth = firebase.auth();

  // Берем email
  var emailAddress = email;

console.log(emailAddress);
  // Отправляем email с паролем
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email отправлен
    console.log("Пароль на email отправлен");
  }, function(error) {
    // Ошибка
    console.log("Пароль на email не отправлен")
  });

}



exports.get = function(req, res) {
  res.render('restorePassword');
};
