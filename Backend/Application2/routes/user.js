 const userController = require('../controllers/userController');

module.exports = (app) => {
    const user = '/api/user/';
    app.get(`${user}get`,userController.getUser);
   
}