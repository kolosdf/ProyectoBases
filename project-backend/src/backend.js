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
// Agregar Conductor
app.post('/SignIn/Driver/:cedula-:numCel-:nombre-:apellido-:contra-:diaNac-:mesNac-:anoNac-:direccion-:email-:genero-:modoPago-:numeroC-:banco', function (req,res) {
  const cedula = req.params.cedula;
  const numCel = req.params.numCel;
  const nombre = req.params.nombre;
  const apellido = req.params.apellido;
  const disponibilidad = 'ocupado';
  const contra = req.params.contra;
  const diaNac = req.params.diaNac;
  const mesNac = req.params.mesNac;
  const anoNac = req.params.anoNac;
  const fechaNac = anoNac+"-"+mesNac+"-"+diaNac;
  const direccion = req.params.direccion;
  const email = req.params.email;
  const genero = req.params.genero;
  const modoPago = req.params.modoPago;
  const numeroC = req.params.numeroC;
  const banco = req.params.banco;
  
  db.one('SELECT AddDriver($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
                                     [escape(cedula), escape(numCel), escape(nombre), escape(apellido), escape(disponibilidad),
                                      escape(contra), escape(fechaNac), escape(direccion), escape(email),
                                      escape(genero), escape(modoPago), escape(numeroC), escape(banco)])
  .then(function (data) {
    console.log(data.adddriver);
    res.send(data.adddriver);
  })
  .catch(function (error) {
    console.log('Error', error)
  })
})

//Validar Conductor
app.get('/Driver/:conduCedula-:conduPass', function (req,res) {
  const conduCedula = req.params.conduCedula;
  const conduPass = req.params.conduPass;

  db.one('SELECT validateDriver($1, $2)', [escape(conduCedula),escape(conduPass)])
  .then(function (data) {
    console.log('Conductor Encontrado?', data.validatedriver);
    res.send(data.validatedriver);
  })
  .catch(function (error) {
    console.log('Error', error)
  })
})

//Cerrar sesion de conductor
app.delete('/Driver/Exit/:placa-:cedula-:dispo', function (req,res) {
  const cedula = req.params.cedula;
  const placa = req.params.placa;
  const dispo = req.params.dispo;

  db.one('SELECT ExitDriver($1, $2, $3)', [escape(cedula),escape(placa),escape(dispo)])
  .then(function (data) {
    console.log('Conductor Desconectado');
    res.send(true);
  })
  .catch(function (error) {
    console.log('Error', error)
    res.send(false);
  })
})

app.post('/Driver/Dispo/:cedula-:dispo', function (req,res) {
  const cedula = req.params.cedula;
  const dispo = req.params.dispo;  

  db.one('SELECT ChangeDispo($1, $2)', [escape(cedula), escape(dispo)])
  .then(function (data) {    
    console.log("Disponibilidad Conductor: ", data.changedispo);
    res.send(data.changedispo);
  })
})

//////////////////////////////////////////////////////////
app.get('/Driver/Main/MiTaxi-Disp/:placa-:cedula', function (req,res) {
  const cedula = req.params.cedula;
  const placa = req.params.placa;  

  db.one('SELECT TaxiDisp($1, $2)', [escape(cedula), escape(placa)])
  .then(function (data) {    
    console.log("Taxi disponible?", data.taxidisp);
    res.send(data.taxidisp);
  })
})


function createRelationConduce(cedula,placa){
  db.none('INSERT INTO conduce VALUES ($1, $2)', [escape(cedula),escape(placa)])
  .then(function (data) {    
    console.log(cedula,"Conduce: ",placa);
  })
  .catch(function (error) {
    console.log('Error', error);
  })
}

//Obtener Info Taxi
  //placa: placa del taxi
  //cedula: cedula del conductor
  //assign: True para indicar que se asigna al conductor el taxi. False para pedir la informacion solamente
app.get('/Driver/Main/MiTaxi/:placa-:cedula-:assign', function (req,res) {
  const cedula = req.params.cedula;
  const placa = req.params.placa;
  const assign = req.params.assign;

  db.one('SELECT * FROM Taxi WHERE placa=$1', [escape(placa)])
  .then(function (data) {    
    const resultado = {
      marca: data.marca,
      modelo: data.modelo,
      ano: data.ano,
      baul: data.baul,
      soat: data.soat,
    }

    if(assign){
      createRelationConduce(cedula,placa);
    }    

    console.log(resultado);
    res.send(resultado);    
  })
  .catch(function (error) {
    console.log('Error', error)
    res.send(null);
  })
})

// Agregar Taxi
app.post('/Driver/Main/MiTaxi/AddTaxi/:placa-:marca-:modelo-:ano-:baul-:soat', function (req,res) {
  const placa = req.params.placa;
  const marca = req.params.marca;
  const modelo = req.params.modelo;
  const ano = req.params.ano;
  const baul = req.params.baul;
  const soat = req.params.soat;

  
  db.one('SELECT AddTaxi($1, $2, $3, $4, $5, $6)',
                                     [escape(placa), escape(marca), escape(modelo), escape(ano),
                                      escape(baul), escape(soat)])
  .then(function (data) {
    console.log(data.addtaxi);
    res.send(data.addtaxi);
  })
  .catch(function (error) {
    console.log('Error', error)
  })
})

//--------------------------------------------------------------------------------------------------------------
//------------------------------------------ USUARIO QUERYS ----------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
// Agregar Usuario
app.post('/SignIn/User/:numCel-:nombre-:apellido-:dirResid-:contra-:tipoT-:diaVencT-:mesVencT-:anoVencT-:numeroT-:NumSegT', function (req,res) {
  const numCel = req.params.numCel;
  const nombre = req.params.nombre;
  const apellido = req.params.apellido;
  const dirResid = req.params.dirResid;
  const contra = req.params.contra;
  const tipoT = req.params.tipoT;
  const diaVencT = req.params.diaVencT;
  const mesVencT = req.params.mesVencT;
  const anoVencT = req.params.anoVencT;
  const fechaVencT = diaVencT+"-"+mesVencT+"-"+anoVencT;  
  const numeroT = req.params.numeroT;
  const NumSegT = req.params.NumSegT;

  
  db.one('SELECT AddUser($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                                     [escape(numCel), escape(nombre), escape(apellido), escape(dirResid),
                                      escape(contra), escape(tipoT), escape(fechaVencT), escape(numeroT), escape(NumSegT)])
  .then(function (data) {
    console.log(data.adduser);
    res.send(data.adduser);
  })
  .catch(function (error) {
    console.log('Error', error)
  })
})

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



