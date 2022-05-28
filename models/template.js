//const { Schema, model } = require ('mongoose');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const templateSchema = Schema({
    title: {
        type: String,
        required: [true,'Campo requerido: Titulo']
    },
    message: {
        type: String,
        required: [true,'Campo requerido: Mensaje']
    },
    priority: {
        type: Boolean,
        required: [true,'Campo requerido: Prioridad']
    },
    createAt: {
        type: Date,
        required: [true,'Requerimiento interno: Fecha de creacion']
    },
    ddcenter:[{
        _id:{
            type: String,
            required: [false,'Campo requerido: Id de Centro de distribucion']
        } 
    }],
    author:[{
        _id:{
            type: String,
            required: [false,'Campo requerido: Id de Supervisor/Supervisor']
        } 
    }]
})


module.exports = mongoose.model('Template', templateSchema);