const {Router } = require('express')

const categoryRouter = require('./catRouter')


const router = new Router()

router.use('/categories', categoryRouter)

module.exports = router;