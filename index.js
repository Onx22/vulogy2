const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const app = express()

app.use('/public', express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.set('view engine', 'ejs');



app.get('/', (req,res)=>{
	res.render('loggedpage');
})

// NEW USER CREATION

app.post('/createUser', (req, res) => {
  store
    .createUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})
// LOGIN

app.post('/login', (req, res) => {
  store
    .authenticate({
      username: req.body.username,
      password: req.body.password
    })
    .then(({ success }) => {
      if (success){
      	// res.sendStatus(200)
      	res.render("loggedpage")
      } 
      else res.sendStatus(401)
    })
})

// STARTING 
app.listen(7555, () => {
  console.log('Server running on http://localhost:7555')
})