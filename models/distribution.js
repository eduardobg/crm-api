//const { Schema, model } = require ('mongoose');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const distributionSchema = Schema({
    name: {
        type: String,
        required: [true,'Campo requerido: Nombre']
    },
    address: {
        type: String,
        required: [true,'Campo requerido: Direccion']
    },
    district: {
        type: String,
        required: [true,'Campo requerido: Distrito']
    },
    province: {
        type: String,
        required: [true,'Campo requerido: Provincia']
    },
    department: {
        type: String,
        required: [true,'Campo requerido: Departamento']
    }
})


module.exports = mongoose.model('Distribution', distributionSchema);