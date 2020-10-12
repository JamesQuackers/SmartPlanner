const ingredients = require('../controllers/ingredients.controller');

module.exports = function (app) {
    app.route('/api/ingredients/add')
        .post(ingredients.create);


};
