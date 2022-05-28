const Supervisor = require('../models/supervisor.js');
const Customer = require('../models/customer.js');
const Seller = require('../models/seller.js');
const Distribution = require('../models/distribution.js');
const Template = require('../models/template.js');

const customerEmailExists = async(email = '') => {

    const emailExists = await Customer.findOne( {email} );
    if( emailExists ){
        throw new Error(`El ${email} ya esta siendo utilizado! Prueba con otra`)
    }
}

const sellerEmailExists = async(email = '') => {

    const emailExists = await Seller.findOne( {email} );
    if( emailExists ){
        throw new Error(`El ${email} ya esta siendo utilizado! Prueba con otra`)
    }
}


const supervisorEmailExists = async(email = '') => {

    const emailExists = await Supervisor.findOne( {email} );
    if( emailExists ){
        throw new Error(`El ${email} ya esta siendo utilizado! Prueba con otra`)
    }
}

const verifyStatusName = async(state = '') => {

    if( state=="Activo" || state=="Suspendido" ){
        
    }else{
        throw new Error(`${state} no es un estado valido!`)
    }
}

const customerExistsById = async( id) => {

    const idExists = await Customer.findById( id );
    if( !idExists ){
        throw new Error(`No se encontro ningun cliente con el id: ${id} `)
    }
}

const sellerExistsById = async( id) => {

    const idExists = await Seller.findById( id );
    if( !idExists ){
        throw new Error(`No se encontro ningun vendedor con el id: ${id} `)
    }
}

const supervisorExistsById = async( id) => {

    const idExists = await Supervisor.findById( id );
    if( !idExists ){
        throw new Error(`No se encontro ningun supervisor con el id: ${id} `)
    }
}

const distributionExistsById = async( id) => {

    const idExists = await Distribution.findById( id );
    if( !idExists ){
        throw new Error(`No se encontro ningun centro de distribucion con el id: ${id} `)
    }
}

const templateExistsById = async( id) => {

    const idExists = await Template.findById( id );
    if( !idExists ){
        throw new Error(`No se encontro ninguna plantilla de mensaje con el id: ${id} `)
    }
}

module.exports = {
    customerEmailExists,
    sellerEmailExists,
    supervisorEmailExists,
    verifyStatusName,
    customerExistsById,
    supervisorExistsById,
    sellerExistsById,
    distributionExistsById,
    templateExistsById
}