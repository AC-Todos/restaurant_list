const db = require('../../config/mongoose') // 載入 mongoose
const Restaurant = require('../restaurant')
const recentRestaurantList = require('../../restaurant.json').results

db.once('open', () => {
  console.log('mongodb connected!')
  // console.log(Restaurant)
  Restaurant.create(recentRestaurantList)
  console.log('done.')
})