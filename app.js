const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


const Restaurant = require('./models/restaurant')

const app = express()

const port = 8080



app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

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


app.get('/', (req, res) => {
  // past the movie data into 'index' partial template
  Restaurant.find()
    .lean()
    .then(data => res.render('index', {restaurants: data}))
    .catch(error => console.log(error))
})

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const selected = restaurants.results.filter(restaurant => {
//     const isNameMatched = restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//     const isCategoryMatched = restaurant.category.toLowerCase().includes(keyword.toLowerCase())
//     return (isNameMatched || isCategoryMatched)
//   })
//   res.render('index', { restaurants: selected, keyword: keyword })
// })

// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const restaurant = restaurants.results.find(restaurant =>
//     restaurant.id.toString() === req.params.restaurant_id
//   )
//   res.render('show', { restaurant: restaurant })
// })

app.listen(port, () => {
  console.log("My Restaurant Server Started...")
  console.log("Listening on http://localhost:8080")
})