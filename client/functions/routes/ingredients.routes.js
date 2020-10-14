const ingredients = require('../controllers/ingredients.controller');

module.exports = function (app) {
    app.route('/api/ingredients/add')
        .post(ingredients.create);
    app.route('/api/ingredients')
        .get(ingredients.get);
    app.route('/api/ingredients/:ingredientId')
        .delete(ingredients.delete);

};
