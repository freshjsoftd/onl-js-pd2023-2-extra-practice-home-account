const { Router } = require('express');
// ====================
const {
	registration,
	login,
	logout,
	refresh,
	getUsers,
	deleteUser
} = require('../controllers/authControllers');
const {authHandler} = require('../middlewares/auth.mw')

const authRouter = new Router()

authRouter.post('/registration', registration)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/refresh', refresh)
authRouter.get('/users', authHandler, getUsers)
authRouter.delete('/del', authHandler, deleteUser)

module.exports = authRouter;