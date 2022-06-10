const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Seller = require('../models/seller.js');
//const { use } = require('express/lib/application');

const sellersGet = async(req, res = response) => {

    const{ limit=10, from=0 } = req.query
    //const query = { state: "Activo"};

    const [total, sellers] = await Promise.all([
        Seller.count(),
        Seller.find()
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
    const _idConditional = {_id : id};

    Seller.findById(_idConditional, (err, sellerDB ) => {
        if(err){
            //throw new Error(err);
            return res.status(400).json({
                ok: 'false',
                err
            });
        }
        return res.json({
            ok:'true',
            seller: sellerDB
        });
    });

}

const sellersGetByDni = async(req, res = response) => {

    const { dni } = req.params;
    const _idConditional = {dni : dni};

    Seller.findOne(_idConditional, (err, sellerDB ) => {
        if(err){
            //throw new Error(err);
            return res.status(400).json({
                ok: 'false',
                err
            });
        }
        return res.json({
            ok:'true',
            sellerDB: sellerDB
        });
    });

}

const sellersPost = async(req, res = response) => {

    //Error validator 
    const {dni, name, lastName, password, role="vendedor", createAt, phone, email, state="Activo", supervisor } = req.body;
    const seller = new Seller( {dni, name, lastName, password, role, createAt, phone, email, state, supervisor } );    

    const salt = bcryptjs.genSaltSync();
    seller.password = bcryptjs.hashSync( password, salt);

    //Para grabar el registro
    await seller.save();

    res.json({
        ok:'true',
        seller:seller
    });
}

const sellersPut = (req, res = response) => {

    const { id } = req.params;
    const _idConditional = {_id : id};
    const {dni, name, lastName, phone, email, state="Activo", supervisor } = req.body;
    const update = { dni:dni, name: name, lastName: lastName, phone: phone, supervisor: supervisor};
    //create_at, state, email,
    Seller.findOneAndUpdate(_idConditional, update, {new:true}, (err, sellerDB ) => {
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
            seller: sellerDB
        });
    })
    
}

const sellersStatePut = (req, res = response) => {

    const { id, state } = req.params;
    const _idConditional = {_id : id};
    const update = {state : state};
   // const {create_at, state, email, ...the_rest} = req.body;
    
    Seller.findOneAndUpdate(_idConditional, update, {new:true}, (err, sellerDB ) => {
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
            seller: sellerDB
        });
    })
    
}

module.exports = {
    sellersGet,
    sellersPost,
    sellersPut,
    sellersStatePut,
    sellersGetById,
    sellersGetByDni
}