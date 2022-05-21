const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const sellerSchema = Schema({
    name: {
        type: String,
        required: [true,'Campo requerido: Nombre']
    },
    lastName: {
        type: String,
        required: [true,'Campo requerido: Apellido']
    },
    password: {
        type: String,
        required: [true,'Campo requerido: Contraseña']
    },
    role: {
        type: String,
        required: [true,'Campo requerido: Rol']
    },
    createAt: {
        type: Date,
        required: [true,'Requerimiento interno: Fecha de creacion']
    },
    phone: {
        type: String,
        required: [true,'Campo requerido: Telefono']
    },
    email: {
        type: String,
        required: [true,'Campo requerido: Email']
    },
    state: {
        type: String,
        default:  [true,'Requerimiento interno: Estado']
    },
    supervisor:[{
        _id:{
            type: String,
            required: [false,'Campo requerido: Id de Supervisor']
        } 
    }]
})


module.exports = mongoose.model('Seller', sellerSchema);