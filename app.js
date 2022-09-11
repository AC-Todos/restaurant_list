const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


const Restaurant = require('./models/restaurant')

const app = express()

const port = 8080



app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))


const mongoose = require('mongoose'); // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, { useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const routes = require('./routes')

app.use(routes)



app.listen(port, () => {
  console.log("My Restaurant Server Started...")
  console.log("Listening on http://localhost:8080")
})