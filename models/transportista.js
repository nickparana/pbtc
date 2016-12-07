exports = module.exports = function (app, mongoose) {

    var transportistaSchema = new mongoose.Schema({
        userid: { type: String },
        password: { type: String },
        cuit: { type: String },
        cuil: { type: String },
        nombreTransporte: { type: String },
        patenteChasis: { type: String },
        patenteAcoplado: { type: String },
        tipoCamion: { type: String },
        nombre: { type: String },
        apellido: { type: String },
        telef: { type: String },
        celular: { type: String },
        email: { type: String },
        ciudad: { type: String },
        cargas: [{}],
        latActual: { type: Number },
        lngActual: { type: Number },
        estado: {type: String}
    });

    mongoose.model('Transportista', transportistaSchema);

};
