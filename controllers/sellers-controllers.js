const { response } = require('express');

//const bcryptjs = require('bcryptjs');

const Seller = require('../models/seller.js');
//const { use } = require('express/lib/application');

const sellersGet = async(req, res = response) => {

    const{ limit=10, from=0 } = req.query
    const query = { state: "Activo"};

    const [total, sellers] = await Promise.all([
        Seller.count(query),
        Seller.find(query)
            .skip(from)
            .limit(limit)
    ]);

    res.json({
        total,
        sellers
    });
}

const sellersGetById = async(req, res = response) => {

    const { id } = req.params;

    Seller.findById(id, (err, customerDB ) => {
        if(err){
            //throw new Error(err);
            return res.status(400).json({
                ok: 'false',
                err
            });
        }
        return res.json({
            ok:'true',
            seller: customerDB
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
    const {name, lastName, businessName, ruc_dni, createAt, address, phone, email, state="Activo", seller } = req.body;
    const update = {name: name, lastName: lastName, businessName: businessName, ruc_dni: ruc_dni, address: address, phone: phone, seller: seller};
    //create_at, state, email,
    Customer.findOneAndUpdate(id, update, {new:true}, (err, customerDB ) => {
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
    const update = {state : state};
   // const {create_at, state, email, ...the_rest} = req.body;
    
    Customer.findOneAndUpdate(id, update, {new:true}, (err, customerDB ) => {
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