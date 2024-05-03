const express = require('express')
const apiRoutes = require('./routes/api')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('hello world')
})

app.use('/api', apiRoutes)

const port = 4000
var server = require('http').Server(app)
server.listen(port, () => {})
