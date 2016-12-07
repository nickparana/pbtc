exports = module.exports = function (app, mongoose) {

    var usuarioSchema = new mongoose.Schema({
        userid: { type: String, unique: true },
        password: { type: String },
        email: { type: String },
        nombre: { type: String },
        apellido: { type: String },
        admin: {type: Boolean}
    });

    mongoose.model('Usuario', usuarioSchema);

};
