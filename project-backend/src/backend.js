const express = require('express');
const cors = require('cors');
const app = express();
const port = 3500;
const pgp = require('pg-promise')(/* options */);
const db = pgp('postgres://postgres:1144211502@localhost:5434/NotEasyTaxi');

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
  })

//------------------------------------------ CONDUCTOR QUERYS ----------------------------------------------------  
app.get('/Driver/:conduCedula-:conduPass', function (req,res) {
  const conduCedula = req.params.conduCedula;
  const conduPass = req.params.conduPass;

  db.one('SELECT validateDriver($1, $2)', [escape(conduCedula),escape(conduPass)])
  .then(function (data) {
    console.log('Usuario Encontrado?', data.validatedriver);
    res.send(data.validatedriver);
  })
  .catch(function (error) {
    console.log('Error', error)
  })
})

//------------------------------------------ USUARIO QUERYS ----------------------------------------------------
// Validar el celular y la contraseña del usuario (LOGIN)
app.get('/User/:userCel-:userPass', function (req,res) {
  const userCel = req.params.userCel;
  const userPass = req.params.userPass;

  db.one('SELECT validateUser($1, $2)', [escape(userCel),escape(userPass)])
  .then(function (data) {
    console.log('Usuario Encontrado?', data.validateuser);
    res.send(data.validateuser);
  })
  .catch(function (error) {
    console.log('Error', error)
    res.send(false);
  })
})


//------------------------------------------ OTHER ----------------------------------------------------
app.listen(port, () => console.log(`App listening on port ${port}!`))



