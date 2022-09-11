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


app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(data => res.render('index', { restaurants: data }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const selected = restaurants.filter(restaurant => {
        const isNameMatched = restaurant.name.toLowerCase().includes(keyword.toLowerCase())
        const isCategoryMatched = restaurant.category.toLowerCase().includes(keyword.toLowerCase())
        return (isNameMatched || isCategoryMatched)
      })
      res.render('index', { restaurants: selected, keyword: keyword })
    })
    .catch(error => console.log(error))

})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => { res.render('show', { restaurant }) })
    .catch(error => console.log(error))

})

// create
app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  // why do we do this way?
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// update
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => { res.render('edit', { restaurant }) })
    .catch(error => console.log(error))

})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const updatedRestaurant = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = updatedRestaurant.name
      restaurant.name_en = updatedRestaurant.name_en
      restaurant.category = updatedRestaurant.category
      restaurant.image = updatedRestaurant.image
      restaurant.location = updatedRestaurant.location
      restaurant.phone = updatedRestaurant.phone
      restaurant.google_map = updatedRestaurant.google_map
      restaurant.rating = updatedRestaurant.rating
      restaurant.description = updatedRestaurant.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log("My Restaurant Server Started...")
  console.log("Listening on http://localhost:8080")
})