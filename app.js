const express = require('express')

const app = express()

const port = 8080

const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.get('/', (req, res) => {
  // past the movie data into 'index' partial template
  res.render('index', { restaurants: restaurants.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const selected = restaurants.results.filter(restaurant => {
    const isNameMatched = restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    const isCategoryMatched = restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    return (isNameMatched || isCategoryMatched)
  })
  res.render('index', { restaurants: selected, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurants.results.find(restaurant =>
    restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})

app.listen(port, () => {
  console.log("My Restaurant Server Started...")
  console.log("Listening on http://localhost:8080")
})