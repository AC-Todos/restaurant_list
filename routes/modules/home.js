const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(data => res.render('index', { restaurants: data }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
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

module.exports = router