const {Router } = require('express')

const categoryRouter = require('./catRouter')
const authRouter = require('./authRouter')


const router = new Router()

router.use('/categories', categoryRouter)
router.use('/auth', authRouter)

module.exports = router;