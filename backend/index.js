const express = require('express')
const routes = require('./routes')
const app = express()

app.use(express.json())
/* const db = require("./models/index.js");
db.sequelize.sync({ force: true }); */

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
	res.send('hello world')
})

app.use('/api', routes)

const port = 4000
var server = require('http').Server(app)
server.listen(port, () => {})
