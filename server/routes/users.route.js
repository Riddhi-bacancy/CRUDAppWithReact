const user = require('../controllers/users.controller.js');

// ----------------Requests Handlers--------------------//

const routes = (app) => {

  app.post('/user', user.create);
  app.get('/user/', user.list);
  app.get('/user/:id', user.list);
  app.put('/user/:id', user.edit);
  app.delete('/user/:id', user.delete);

};

// export the API request handlers.
module.exports = { routes };
