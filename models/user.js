var crypto = require('crypto');
var async = require('async'); // - т.е чтобы не писать просто на колбэках + доп.возможности(у нас waterfall)
var util = require('util');
//
// var Firebase = require('firebase');
// var FirebaseSchema = require('firebase-schema');
// var { string, number, boolean, list, hash, index, key } = FirebaseSchema.Types;
//
// var HOST = 'https://fir-auth-f9e4a.firebaseio.com';



// Для того, чтобы наш класс умел сохранаться и искаться в БД
// П римечание: как только объявляем model - mongoose создает все индексы, которые нужны для поодержки schema


// Своя собственная ошибка(для моего вывода)
function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;
