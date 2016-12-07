exports = module.exports = function (app, mongoose) {

    var cargaSchema = new mongoose.Schema({
        codigo: { type: String, unique: true },
        titulo: { type: String },
        peso: { type: Number },     
        distancia: { type: Number },
        tarifa: { type: Number },
        formaPago: { type: String },
        fechaCreacion: { type: Date },
        fechaCarga: { type: Date },
        fechaDescarga: { type: Date },
        descripcion: { type: String },
        estado: { type: String },
        origLat: { type: Number },
        origLng: { type: Number },
        destLat: { type: Number },
        destLng: { type: Number },
        nombreOrigen: { type: String },
        nombreDestino: { type: String },
        transportistaId: { type: String }
    });

    mongoose.model('Carga', cargaSchema);

};
