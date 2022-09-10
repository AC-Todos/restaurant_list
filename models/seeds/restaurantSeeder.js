const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('../restaurant')
const recentRestaurantList = require('../../restaurant.json').results
const restaurant = require('../restaurant')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, { useUnifiedTopology: true }) // 設定連線到 mongoD

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  // console.log(Restaurant)
  Restaurant.create(recentRestaurantList)
  console.log('done.')
})