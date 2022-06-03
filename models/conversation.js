//const { Schema, model } = require ('mongoose');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const conversationSchema = Schema({
    members: {
        author1:{
            type: String,
            required: [true,'Campo requerido: Id del Autor 1']
        },
        author2:{
            type: String,
            required: [true,'Campo requerido: Id del Autor 2']
        }
    },
    message:[{
        author:{
            type: String,
            required: [true,'Campo requerido: Id del Autor']
        },
        body:{
            type: String,
            required: [true,'Campo requerido: Cuerpo del mensaje']
        } 
    }]
})


module.exports = mongoose.model('Conversation', conversationSchema);