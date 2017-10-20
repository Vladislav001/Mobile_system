var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {
  // Каждый 'get' подключает соотсветсвующий модуль и вызывает его метод 'get'
  app.get('/', require('./login').get);
  app.post('/login', require('./login').post); // при poste на login, подключаем post этого модуля()
  app.post('/logout', require('./logout').post);
  app.get('/registration', require('./registration').get);
  app.post('/registration', require('./registration').post);
  app.get('/personalArea', require('./personalArea').get);
  app.get('/test_settings', checkAuth, require('./testSettings').get);
  app.get('/result_test/id:idTag', checkAuth, require('./resultTest').get);
  app.post('/result_test/id:idTag', require('./resultTest').post); // Обновление данных юзера  


  app.post('/addNewUser', require('./addNewUser').post);
  app.post('/updateTestSettings', require('./testSettings').post);
  app.post('/deleteStudent/id:idTag', require('./deleteStudent').post);

  app.get('/restorePassword', require('./restorePassword').get);
  app.post('/restorePassword', require('./restorePassword').post);

};
