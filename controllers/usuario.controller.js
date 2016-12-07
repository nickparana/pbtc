var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

exports.findAllUsuarios = function (req, res) {
    Usuario.find(function (err, usuarios) {
        if (err) res.send(500, err.message);

        console.log('GET /usuarios')
        res.status(200).jsonp(usuarios);
    });
};

exports.findById = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        if (err) return res.send(500, err.message);

        console.log('GET by ID' + req.params.id);
        res.status(200).jsonp(usuario);
        console.log("usuario found with id: " + usuario.userid);
    });
};


exports.findByUserId = function (req, res) {
    Usuario.findOne({ 'userid': req.params.userid }, function (err, usuario) {
        if (err) return res.send(500, err.message);

        console.log('GET by UserID: ' + req.params.userid);
        res.status(200).jsonp(usuario);
        console.log("usuario found with id: " + usuario.userid);
    });
};

exports.findByEmail = function (req, res) {
    Usuario.findOne({ 'email': req.params.email }, function (err, usuario) {
        if (err) return res.send(500, err.message);

        console.log('GET by Email: ' + req.params.email);
        res.status(200).jsonp(usuario);
        console.log("usuario found with email: " + usuario.email);
    });
};


exports.addUsuario = function (req, res) {
    console.log('POST');
    console.log(req.body);

    var usuario = new Usuario({
        userid: req.body.userid,
        password: req.body.password,
        email: req.body.email,
        nombre: req.body.nombre,
        apellido: req.body.apellido
    });

    usuario.save(function (err, usuario) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(usuario);
    });
};

exports.updateUsuario = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        console.log('Method: PUT');
        console.log("req.body: " + JSON.stringify(req.body));

        usuario.userid = req.body.userid;
        usuario.password = req.body.password;
        usuario.email = req.body.email;
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;

        usuario.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(usuario);
        });
    });
};

exports.deleteUsuario = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        usuario.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200);
        })
    });
};


