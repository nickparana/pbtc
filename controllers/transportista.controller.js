var mongoose = require('mongoose');
var Transportista = mongoose.model('Transportista');

exports.findAllTransportistas = function (req, res) {
	Transportista.find(function (err, transportistas) {
		if (err) res.send(500, err.message);

		console.log('GET /transportistas')
		res.status(200).jsonp(transportistas);
	});
};

exports.findById = function (req, res) {
	Transportista.findById(req.params.id, function (err, transportista) {
		if (err) return res.send(500, err.message);

		console.log('GET by ID' + req.params.id);
		res.status(200).jsonp(transportista);
		console.log("transportista found with Name: " + transportista.nombre);
	});
};


exports.findByUserId = function (req, res) {
	Transportista.findOne({ 'userid': req.params.userid }, function (err, transportista) {
		if (err) return res.send(500, err.message);

		console.log('GET by UserID: ' + req.params.userid);
		res.status(200).jsonp(transportista);
		console.log("transportista found with Name: " + transportista.nombre);
	});
};

exports.addTransportista = function (req, res) {
	console.log('POST');
	console.log(req.body);

	var transportista = new Transportista({
		userid: req.body.userid,
		password: req.body.password,
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		cuit: req.body.cuit,
		cuil: req.body.cuil,
		nombreTransporte: req.body.nombreTransporte,
		patenteChasis: req.body.patenteChasis,
		patenteAcoplado: req.body.patenteAcoplado,
		tipoCamion: req.body.tipoCamion,
		telef: req.body.telef,
		celular: req.body.celular,
		email: req.body.email,
		estado: req.body.estado,
		ciudad: req.body.ciudad,
		cargas: req.body.cargas,
		latActual: req.body.latActual,
		lngActual: req.body.lngActual
	});

	transportista.save(function (err, transportista) {
		if (err) return res.send(500, err.message);
		res.status(200).jsonp(transportista);
	});
};

exports.updateTransportista = function (req, res) {
	Transportista.findById(req.params.id, function (err, transportista) {
		console.log('Method: PUT');
		console.log("req.body: " + JSON.stringify(req.body));

		transportista.userid = req.body.userid;
		transportista.password = req.body.password;
		transportista.nombre = req.body.nombre;
		transportista.apellido = req.body.apellido;
		transportista.cuit = req.body.cuit;
		transportista.cuil = req.body.cuil;
		transportista.nombreTransporte = req.body.nombreTransporte;
		transportista.patenteChasis = req.body.patenteChasis;
		transportista.patenteAcoplado = req.body.patenteAcoplado;
		transportista.tipoCamion = req.body.tipoCamion;
		transportista.telef = req.body.telef;
		transportista.celular = req.body.celular;
		transportista.email = req.body.email;
		transportista.estado = req.body.estado;
		transportista.ciudad = req.body.ciudad;
		transportista.cargas = req.body.cargas;
		transportista.latActual = req.body.lngActual;
		transportista.lngActual = req.body.latActual;

		transportista.save(function (err) {
			if (err) return res.send(500, err.message);
			res.status(200).jsonp(transportista);
		});
	});
};

exports.deleteTransportista = function (req, res) {
	Transportista.findById(req.params.id, function (err, transportista) {
		transportista.remove(function (err) {
			if (err) return res.send(500, err.message);
			res.status(200);
		})
	});
};
