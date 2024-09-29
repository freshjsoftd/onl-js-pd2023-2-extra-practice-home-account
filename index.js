const http = require('http')
// ====================================
require('dotenv').config()

const app = require('./src/app')
const db = require('./src/db/models')
const dbMongo = require('./src/db/mongo')
const {roles, users} = require('./src/constants/mongoDate')

const {User, Role} = dbMongo;

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const dbCheck = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(`Connection to DB ${process.env.DB_NAME} has been done`)
  } catch (error) {
    console.log(`Can't connect to DB ${process.env.DB_NAME}`, error.message)
  }
}

dbCheck();

const createRoles = async () => {
  await Role.insertMany(roles)
}

// createRoles()

const createUsers = async () => {
  await User.create(users)
}

// createUsers()

server.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
