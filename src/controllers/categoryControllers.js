const createError = require('http-errors')
// ====================================
const {category, sequelize} = require('../db/models')

class CategoryControllers {

  async getAllCategories(req, res, next){
    try {
      const allCategories = await category.findAll({
        attributes: ['id', 'title'],
        raw: true,
      })
      console.log(allCategories)
      if(allCategories.length > 0){
        console.log(`Result is ${JSON.stringify(allCategories, null, 2)}`)
        res.status(200).json(allCategories)
      }else{
        next(createError(404, 'Any categories has not been found'))
      }
    } catch (error) {
      next(error)
    }
  }

  async createCategory(req, res, next){
    const t = await sequelize.transaction()
    try {
      const body = req.body
      // const {body} = req
      const newCategory = await category.create(body, {
        transaction: t,
        returning: ['id'],
      })
      console.log(newCategory)
      if(newCategory){
        console.log(`Result is ${JSON.stringify(newCategory, null, 2)}`)
        res.status(200).json(newCategory)
      }else{
        next(createError(400, 'Bad request'))
      }
      await t.commit()
    } catch (error) {
      await t.rollback()
      next(error)
    }
  };
  async updateCategory(req, res, next){};
  async deleteCategory(req, res, next){};
}

module.exports = new CategoryControllers();