const { response } = require('express');

//const bcryptjs = require('bcryptjs');

const Customer = require('../models/customer.js');
//const { use } = require('express/lib/application');

const customersGet = async(req, res = response) => {

    const{ limit=10, from=0 } = req.query
    //const query = { state: "Activo"}; query para filtrar estadp

    const [total, customers] = await Promise.all([
        Customer.count(),//Customer.count(query)
        Customer.find()
            .skip(from)
            .limit(limit)
    ]);

    res.json({
        total,
        customers
    });
}

const customerGetById = async(req, res = response) => {

    const { id } = req.params;
    const _idConditional = {_id : id};

    Customer.findById(_idConditional, (err, customerDB ) => {
        if(err){
            //throw new Error(err);
            return res.status(400).json({
                ok: 'false',
                err
            });
        }
        return res.json({
            ok:'true',
            customer: customerDB
        });
    });

}

const customersPost = async(req, res = response) => {

    //Error validator 
    const { name, lastName, businessName, ruc_dni, createAt, address, phone, email, state="Activo", seller } = req.body;
    const customer = new Customer( {name, lastName, businessName, ruc_dni, createAt, address, phone, email, state, seller } );    

    //Para grabar el registro
    await customer.save();

    res.json({
        ok:'true',
        customer:customer
    });
}

const customersPut = (req, res = response) => {

    const { id } = req.params;
    const _idConditional = {_id : id};
    const {name, lastName, businessName, ruc_dni, createAt, address, phone, email, state="Activo", seller } = req.body;
    const update = {name: name, lastName: lastName, businessName: businessName, ruc_dni: ruc_dni, address: address, phone: phone, seller: seller};
    //create_at, state, email,
    Customer.findOneAndUpdate(_idConditional, update, {new:true}, (err, customerDB ) => {
        if(err){
            //throw new Error(err);
            return res.status(400).json({
                ok: 'false',
                err,
                update
            });
        }
        return res.json({
            ok:'true',
            customer: customerDB
        });
    })
    
}

const customersStatePut = (req, res = response) => {

    const { id, state } = req.params;
    const _idConditional = {_id : id};
    const update = {state : state};
   // const {create_at, state, email, ...the_rest} = req.body;
    
    Customer.findOneAndUpdate(_idConditional, update, {new:true}, (err, customerDB ) => {
        if(err){
            //throw new Error(err);
            return res.status(400).json({
                ok: 'false',
                err,
                update
            });
        }
        return res.json({
            ok:'true',
            customer: customerDB
        });
    })
    
}

module.exports = {
    customersGet,
    customersPost,
    customersPut,
    customersStatePut,
    customerGetById
}