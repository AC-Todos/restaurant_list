const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


const app = express()

const port = 8080



app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))


require('./config/mongoose')


const routes = require('./routes')

app.use(routes)



app.listen(port, () => {
  console.log("My Restaurant Server Started...")
  console.log("Listening on http://localhost:8080")
})