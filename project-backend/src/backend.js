const express = require('express')
const app = express()
const port = 3500
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:1144211502@localhost:5434/NotEasyTaxi')



app.get('/', function (req, res) {
    res.send('Hello World!')
  })

app.get('/User/:userCel-:userPass', function (req,res) {
  const userCel = req.params.userCel;
  const userPass = req.params.userPass;

  db.one('SELECT * FROM Usuario WHERE numcel= $1 AND contrasena= $2', [escape(userCel),escape(userPass)])
  .then(function (data) {
    console.log('DATA:', data.numCel)
    res.send(data.numcel)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))



