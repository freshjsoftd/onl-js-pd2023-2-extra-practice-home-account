const {Router} = require('express')
// ==============================
const categoryCtrl = require('../controllers/categoryControllers')

const categoryRouter = new Router()

categoryRouter.route('/')
    .get(categoryCtrl.getAllCategories)
    .post(categoryCtrl.createCategory)
    .put(categoryCtrl.updateCategory)

categoryRouter.route('/:id')
    .delete(categoryCtrl.deleteCategory)

module.exports = categoryRouter;