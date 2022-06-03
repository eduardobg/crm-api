//const { Schema, model } = require ('mongoose');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const campaignMessageSchema = Schema({
    id_seller: {
        type: String,
        required: [true,'Campo requerido: Id de Vendedor']
    },
    id_customer: {
        type: String,
        required: [true,'Campo requerido: Id de Cliente']
    },
    message: {
        type: String,
        required: [true,'Campo requerido: Id de Cliente']
    },
    receiver_phone: {
        type: String,
        required: [true,'Campo requerido: Telefono del Cliente']
    },
})

module.exports = mongoose.model('CampaignMessage', campaignMessageSchema);