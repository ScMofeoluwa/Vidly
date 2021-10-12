const express = require('express')
const home = require('./routes/home')
const genres = require('./routes/genres')
const app = express()

app.use(express.json())
app.use('/', home)
app.use('/api/genres', genres)

const port = process.env.PORT || 2000
app.listen(port, () => console.log(`Listening on ${port}...`))