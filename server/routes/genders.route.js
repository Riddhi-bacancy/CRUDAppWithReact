const gender = require('../controllers/genders.controller.js');

// ----------------Requests Handlers--------------------//

const routes = (app) => {

  
  app.get('/gender/', gender.list);
  

};

// export the API request handlers.
module.exports = { routes };
