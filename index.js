const http = require('http')
// ====================================
require('dotenv').config()

const app = require('./src/app')

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
