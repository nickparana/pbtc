var express = require("express"),
  app = express(),
  cors = require('cors'),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  jwt = require('jsonwebtoken');

var config = require('./config/config');

//cors
app.use(cors())

// Connection to DB
mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err, res) {
  if (err) throw err;
  console.log('Connected to Database');
});
app.set('superSecret', config.secret);
app.use(morgan('dev'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static(__dirname + '/dist'));

// Import Models and controllers
var models = require('./models/transportista')(app, mongoose);

var models = require('./models/usuario')(app, mongoose);
var TransportistaCtrl = require('./controllers/transportista.controller');

var UsuarioCtrl = require('./controllers/usuario.controller');

// Example Route
var router = express.Router();
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});
app.use(router);

// API routes
var transportistas = express.Router();

var usuarios = express.Router();
var authenticate = express.Router();

// --------------------------- JWT


var Usuario = mongoose.model('Usuario');

authenticate.post('/authenticate', function (req, res) {
  Usuario.findOne({ userid: req.body.userid }, function (err, usuario) {

    if (err) throw err;

    if (!usuario) {
      res.json({ success: false, message: 'Authentication failed. User not found' });
    }
    else if (usuario) {

      // check if password matches
      if (usuario.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var id_token = jwt.sign(usuario, config.secret, {
          expiresIn: 86400 // seconds
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          id_token: id_token
        });
      }

    }
  });
});
app.use('/api', authenticate);
//- -----------------------------------



transportistas.route('/transportistas')
  .get(TransportistaCtrl.findAllTransportistas)
  .post(TransportistaCtrl.addTransportista);



transportistas.route('/transportistas/:id')
  .get(TransportistaCtrl.findById)
  .put(TransportistaCtrl.updateTransportista)
  .delete(TransportistaCtrl.deleteTransportista);


transportistas.route('/transportistas/userid/:userid')
  .get(TransportistaCtrl.findByUserId)


// ----------------------------------------


usuarios.use(function (req, res, next) {
  
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "Tu petición no tiene cabecera de autorización" });
  }

  var id_token = req.headers.authorization.split(" ")[1];

  if (id_token) {

 
    jwt.verify(id_token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});

usuarios.route('/usuarios')
  .get(UsuarioCtrl.findAllUsuarios)
  .post(UsuarioCtrl.addUsuario)

usuarios.route('/usuarios/userid/:userid')
  .get(UsuarioCtrl.findByUserId)

app.use('/api', transportistas);
app.use('/api', usuarios);


// Start server
app.listen(8000, function () {
  console.log("Node server running on http://localhost:8000");
});