
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const apiProductRoute = require("./routes/api.route");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('src/server/db.json')
const db = low(adapter)

const publicPath = path.resolve(__dirname, '..', '..', 'public');
app.use(express.static(publicPath));


db.defaults({ issue : [] })
  .write()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/issues', apiProductRoute);






app.listen(3000, () => console.log(`Example app listening on port 3000!`))