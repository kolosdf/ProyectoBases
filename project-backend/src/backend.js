const express = require('express');
const cors = require('cors');
const app = express();
const port = 3500;
const pgp = require('pg-promise')(/* options */);
const configDB = {
  host: 'localhost',
  port: '5434',
  database: 'NotEasyTaxi',
  user: 'postgres',
  password: 'postgres',
  poolSize: 25,
  poolIdleTimeout: 8500,
}
//const db = pgp('postgres://postgres:1144211502@localhost:5434/NotEasyTaxi');
const db = pgp(configDB);
const { check, validationResult } = require('express-validator/check');

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
  })

//----------------------------------------------------------------------------------------------------------------
//------------------------------------------ CONDUCTOR QUERYS ----------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
///////////////////////////////////////
////////// Agregar Conductor //////////
///////////////////////////////////////
app.post('/SignIn/Driver/:cedula-:numCel-:nombre-:apellido-:contra-:diaNac-:mesNac-:anoNac-:direccion-:email-:genero-:modoPago-:numeroC-:banco', [
  check('cedula').isNumeric().isLength({min:5, max:15}),
  check('numCel').isNumeric().isLength({min:10, max:10}),
  check('nombre').isAlpha(),
  check('apellido').isAlpha(),
  check('email').isEmail(),
  check('numeroC').isNumeric(),
  check('banco').isAlpha(),

], (req,res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log({errores: errores.array()})
    return res.send(JSON.stringify("422"));
  }

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

///////////////////////////////////////////////
////////// Validar Conductor (LOGIN) //////////
///////////////////////////////////////////////
app.get(`/Driver/:conduCedula-:conduPass`, [
  check(`conduCedula`).isNumeric().isLength({min:5, max:15}),  
], (req,res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log({errores: errores.array()[0]})
    return res.send(errores.array()[0].param);
    //return res.status(422).json(errores.array()[0].param);    
  }

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

////////////////////////////////////////////////////
////////// Cierra la sesion del conductor //////////
////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////
////////// Cambia la disponibilidad del conductor //////////
////////////////////////////////////////////////////////////
app.post('/Driver/Dispo/:cedula-:dispo', function (req,res) {
  const cedula = req.params.cedula;
  const dispo = req.params.dispo;  

  db.one('SELECT ChangeDispo($1, $2)', [escape(cedula), escape(dispo)])
  .then(function (data) {    
    console.log("Disponibilidad Conductor: ", data.changedispo);
    res.send(data.changedispo);
  })
})

//////////////////////////////////////////////////////////////
////////// Consulta la disponibilidad del conductor //////////
//////////////////////////////////////////////////////////////
app.get('/Driver/Dispo/:cedula', function (req,res) {
  const cedula = req.params.cedula;

  db.one('SELECT disponibilidad FROM conductor WHERE cedula=$1', [escape(cedula)])
  .then(function (data) {
    console.log("Disponibilidad Conductor: ", data.disponibilidad);
    res.send(data.disponibilidad);
  })
})

//////////////////////////////////////////////////////////////
///////////////// Busca petición de servicio /////////////////
//////////////////////////////////////////////////////////////
app.get('/Driver/lookforService/:cedula', function (req,res) {
  const cedula = req.params.cedula;

  db.one('SELECT lookforService($1)', [escape(cedula)])
  .then(function (data) {
    console.log("Servicio?: ", data.lookforservice);
    res.send(data.lookforservice);
  })
})

//////////////////////////////////////////////////////////////////
///////////////// Pide la id del servicio actual /////////////////
//////////////////////////////////////////////////////////////////
app.get('/Driver/askServiceId/:cedula', function (req,res) {
  const cedula = req.params.cedula;
  const estado = 'pendiente'

  db.one('SELECT ids FROM servicio WHERE cedula=$1 AND estado=$2', [escape(cedula), escape(estado)])
  .then(function (data) {
    console.log("Servicio: ", data.ids);
    res.send(data.ids);
  })
})

//////////////////////////////////////////////////////////////
//////////////////// Empezar de servicio /////////////////////
//////////////////////////////////////////////////////////////
app.post('/Driver/startService/:cedula-:idServ', function (req,res) {
  const cedula = req.params.cedula;
  const idServ = req.params.idServ;

  db.one('SELECT startService($1, $2)', [escape(cedula), escape(idServ)])
  .then(function (data) {
    console.log("Servicio inicio: ", data.startservice);
    res.send(data.startservice);
  })
})

//////////////////////////////////////////////////////////////
//////////////////// Pedir terminar servicio /////////////////////
//////////////////////////////////////////////////////////////
app.post('/Driver/askEndService/:cedula-:idServ', function (req,res) {
  const cedula = req.params.cedula;
  const idServ = req.params.idServ;

  db.one('SELECT askEndServiceC($1, $2)', [escape(cedula), escape(idServ)])
  .then(function (data) {
    console.log("Servicio pedir fin: ", data.askendservicec);
    res.send(data.askendservicec);
  })
})

//////////////////////////////////////////////////////////////
//////////////////// Terminar servicio /////////////////////
//////////////////////////////////////////////////////////////
app.post('/Driver/endService/:cedula-:idServ', function (req,res) {
  const cedula = req.params.cedula;
  const idServ = req.params.idServ;

  db.one('SELECT endServiceC($1, $2)', [escape(cedula), escape(idServ)])
  .then(function (data) {
    console.log("Servicio fin: ", data.endservicec);
    res.send(data.endservicec);
  })
})


//////////////////////////////////////////////////////
////////// Verifica disponibilidad del taxi //////////
//////////////////////////////////////////////////////
app.get(`/Driver/Main/MiTaxi-Disp/:placa-:cedula`, function (req,res) {
  const cedula = req.params.cedula;
  const placa = req.params.placa;  

  db.one('SELECT TaxiDisp($1, $2)', [escape(cedula), escape(placa)])
  .then(function (data) {    
    console.log("Taxi disponible?", data.taxidisp);
    res.send(data.taxidisp);
  })
})

////////////////////////////////////////////////////
////////// Le asigna el taxi al conductor //////////
////////////////////////////////////////////////////
function createRelationConduce(cedula,placa){
  db.none('INSERT INTO conduce VALUES ($1, $2)', [escape(cedula),escape(placa)])
  .then(function (data) {    
    console.log(cedula,"Conduce: ",placa);
  })
  .catch(function (error) {
    console.log('Error', error);
  })
}

////////////////////////////////////////////////////
////////// Crear registro taxi ////////////////////
////////////////////////////////////////////////////
app.post(`/Driver/Main/MiTaxi/Map/:placa-:coordenadax-:coordenaday`, function (req,res) {
  const placa = req.params.placa;

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  const fechaHoy = yyyy + '-' + mm + '-' + dd;

  const hours = String(today.getHours() + 1);
  const minut = String(today.getMinutes() + 1);
  const Hora = hours+":"+minut

  const coordenadax = this.state.coordenadax;
  const coordenaday = this.state.coordenaday;

  db.one('INSERT INTO public.registro(fecha, hora, coordenadax, coordenaday, placa) VALUES ($1, $2, $3, $4, $5);', [escape(fechaHoy),escape(Hora),escape(coordenadax),escape(coordenaday), escape(placa)])
  .then(function (data) {    
    console.log(true);
    res.send(true);    
  })
  .catch(function (error) {
    console.log('Error', error)
    res.send(null);
  })
})

///////////////////////////////////////
////////// Obtener Info Taxi //////////
  //placa: placa del taxi
  //cedula: cedula del conductor
  //assign: True para indicar que se asigna al conductor el taxi. False para pedir la informacion solamente
///////////////////////////////////////
app.get(`/Driver/Main/MiTaxi/:placa-:cedula-:assign`, function (req,res) {
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

//////////////////////////////////
////////// Agregar Taxi //////////
//////////////////////////////////
app.post('/Driver/Main/MiTaxi/AddTaxi/:placa-:marca-:modelo-:ano-:baul-:soat', [
  check('placa').isAlphanumeric().isLength({min:6, max:7}),
  check('marca').isAlpha(),
  check('soat').isNumeric(),
], (req,res) => {

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log({errores: errores.array()});
    return res.send(JSON.stringify("Campos Invalidos")); //422
  }
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
/////////////////////////////////////
////////// Agregar Usuario ////////// 
/////////////////////////////////////
app.post(`/SignIn/User/:numCel-:nombre-:apellido-:dirResid-:contra-:tipoT-:diaVencT-:mesVencT-:anoVencT-:numeroT-:NumSegT`, [
  check('numCel').isNumeric().isLength({min:10, max:10}),
  check('nombre').isAlpha(),
  check('apellido').isAlpha(),
  check('numeroT').isNumeric(),
  check('NumSegT').isNumeric(),

], (req,res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log({errores: errores.array()})
    return res.send(JSON.stringify("422"));
  }
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

//////////////////////////////////////////////
////////// Validar Usuario (LOGIN) //////////
/////////////////////////////////////////////
app.get(`/User/:userCel-:userPass`, [
  check(`userCel`).isNumeric().isLength({min:10, max:10}),
], (req,res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log({errores: errores.array()[0]})
    return res.send(errores.array()[0].param);
  }
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

//////////////////////////////////////////////////////////////
//////////////////// Pedir de servicio /////////////////////
//////////////////////////////////////////////////////////////
app.post('/User/AskServiceU/:costoC-:kmRecorrido-:fechaIn-:horaIn-:inicioRX-:inicioRY-:finRX-:finRY-:cedula-:cel', function (req,res) {
  const costoC = req.params.costoC;
  const kmRecorrido = req.params.kmRecorrido;
  const estado = 'pendiente';
  const contador = '0';
  const fechaIn = req.params.fechaIn;
  const horaIn = req.params.horaIn;
  const inicioRX = req.params.inicioRX;
  const inicioRY = req.params.inicioRY;
  const finRX = req.params.finR;
  const finRY = req.params.finR;
  const cedula = req.params.cedula;
  const cel = req.params.cel;

  db.one('SELECT AskServiceU($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [escape(costoC),escape(kmRecorrido),escape(estado),escape(contador),
                                                                         escape(fechaIn),escape(horaIn),escape(inicioRX),escape(inicioRY)
                                                                         ,escape(finRX),escape(finRY),escape(cedula),escape(cel)])
  .then(function (data) {
    console.log("Servicio pedido: ", data.askserviceu);
    res.send(data.askserviceu);
  })
})

//////////////////////////////////////////////////////////////
//////////////////// Pedir terminar servicio /////////////////////
//////////////////////////////////////////////////////////////
app.post('/User/askEndService/:cel-:idServ', function (req,res) {
  const cel = req.params.cel;
  const idServ = req.params.idServ;

  db.one('SELECT askEndServiceU($1, $2)', [escape(cel), escape(idServ)])
  .then(function (data) {
    console.log("Servicio pedir fin: ", data.askendserviceu);
    res.send(data.askendserviceu);
  })
})

//////////////////////////////////////////////////////////////
//////////////////// Terminar servicio /////////////////////
//////////////////////////////////////////////////////////////
app.post('/User/endService/:cel-:idServ', function (req,res) {
  const cel = req.params.cel;
  const idServ = req.params.idServ;

  db.one('SELECT endServiceU($1, $2)', [escape(cel), escape(idServ)])
  .then(function (data) {
    console.log("Servicio fin: ", data.endserviceu);
    res.send(data.endserviceu);
  })
})


//-----------------------------------------------------------------------------------------------------
//------------------------------------------ OTHER ----------------------------------------------------
//-----------------------------------------------------------------------------------------------------
app.listen(port, () => console.log(`App listening on port ${port}!`))
