var mongoose = require('mongoose');
var Carga = mongoose.model('Carga');

exports.findAllCargas = function (req, res) {
	Carga.find(function (err, cargas) {
		if (err) res.send(500, err.message);

		console.log('GET /cargas')
		res.status(200).jsonp(cargas);
	});
};

exports.findById = function (req, res) {
	Carga.findById(req.params.id, function (err, carga) {
		if (err) return res.send(500, err.message);

		console.log('GET by ID' + req.params.id);
		res.status(200).jsonp(carga);
		console.log("carga found with id: " + carga._id);
	});
};


exports.findByCodigo = function (req, res) {
	Carga.findOne({ 'codigo': req.params.codigo }, function (err, carga) {
		if (err) return res.send(500, err.message);

		console.log('GET by Codigo: ' + req.params.codigo);
		res.status(200).jsonp(carga);
		console.log("carga found with codigo: " + carga.codigo);
	});
};

exports.addCarga = function (req, res) {
	console.log('POST');
	console.log(req.body);

	var carga = new Carga({
		codigo: req.body.codigo,
		titulo: req.body.titulo,
		peso: req.body.peso,
		origLat: req.body.origLat,
		origLng: req.body.origLng,
		destLat: req.body.destLat,
		destLng: req.body.destLng,
		nombreOrigen: req.body.nombreOrigen,
		nombreDestino: req.body.nombreDestino,
		distancia: req.body.distancia,
		tarifa: req.body.tarifa,
		formaPago: req.body.formaPago,
		fechaCreacion: req.body.fechaCreacion,
		fechaCarga: req.body.fechaCarga,
		fechaDescarga: req.body.fechaDescarga,
		descripcion: req.body.descripcion,
		estado: req.body.estado,
		transportistaId: req.body.transportistaId
	});

	carga.save(function (err, carga) {
		if (err) return res.send(500, err.message);
		res.status(200).jsonp(carga);
	});
};

exports.updateCarga = function (req, res) {
	Carga.findById(req.params.id, function (err, carga) {
		console.log('Method: PUT');
		console.log("req.body: " + JSON.stringify(req.body));

		carga.codigo = req.body.codigo,
			carga.titulo = req.body.titulo,
			carga.peso = req.body.peso,
			carga.origLat = req.body.origLat,
			carga.origLng = req.body.origLng,
			carga.destLat = req.body.destLat,
			carga.destLng = req.body.destLng,
			carga.nombreOrigen = req.body.nombreOrigen,
			carga.nombreDestino = req.body.nombreDestino,
			carga.distancia = req.body.distancia,
			carga.tarifa = req.body.tarifa,
			carga.formaPago = req.body.formaPago,
			carga.fechaCreacion = req.body.fechaCreacion,
			carga.fechaCarga = req.body.fechaCarga,
			carga.fechaDescarga = req.body.fechaDescarga,
			carga.descripcion = req.body.descripcion,
			carga.estado = req.body.estado,
			carga.transportistaId = req.body.transportistaId


		carga.save(function (err) {
			if (err) return res.send(500, err.message);
			res.status(200).jsonp(carga);
		});
	});
};

exports.deleteCarga = function (req, res) {
	Carga.findById(req.params.id, function (err, carga) {
		carga.remove(function (err) {
			if (err) return res.send(500, err.message);
			res.status(200);
		})
	});
};
