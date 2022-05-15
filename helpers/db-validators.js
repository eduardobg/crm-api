const Customer = require('../models/customer.js');

const customerEmailExists = async(email = '') => {

    const emailExists = await Customer.findOne( {email} );
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


module.exports = {
    customerEmailExists,
    verifyStatusName,
    customerExistsById
}