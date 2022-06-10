//const { Schema, model } = require ('mongoose');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const customerSchema = Schema({
    name: {
        type: String,
        required: [true,'Campo requerido: Nombre']
    },
    lastName: {
        type: String,
        required: [true,'Campo requerido: Apellido']
    },
    businessName: {
        type: String,
        required: [true,'Campo requerido: Nombre comercial']
    },
    ruc_dni: {
        type: String,
        required: [true,'Campo requerido: Ruc o DNI']
    },
    createAt: {
        type: Date,
        required: [true,'Requerimiento interno: Fecha de creacion']
    },
    address: {
        type: String,
        required: [true,'Campo requerido: Direccion']
    },
    phone: {
        type: Number,
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
    seller:[{
        _id:{
            type: String,
            required: [false,'Campo requerido: Id de Vendedor']
        } 
    }]
})


module.exports = mongoose.model('Customer', customerSchema);