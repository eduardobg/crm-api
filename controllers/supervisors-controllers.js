const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Supervisor = require('../models/supervisor.js');
//const { use } = require('express/lib/application');

const supervisorsGet = async(req, res = response) => {

    const{ limit=10, from=0 } = req.query
    //const query = { state: "Activo"};

    const [total, supervisors] = await Promise.all([
        Supervisor.count(),
        Supervisor.find()
            .skip(from)
            .limit(limit)
    ]);

    res.json({
        total,
        supervisors
    });
}

const supervisorsGetById = async(req, res = response) => {

    const { id } = req.params;
    const _idConditional = {_id : id};

    Supervisor.findById(_idConditional, (err, supervisorDB ) => {
        if(err){
            //throw new Error(err);
            return res.status(400).json({
                ok: 'false',
                err
            });
        }
        return res.json({
            ok:'true',
            supervisor: supervisorDB
        });
    });

}

const supervisorsPost = async(req, res = response) => {

    //Error validator 
    const { name, lastName, password, role="supervisor", createAt, phone, email, state="Activo", ddcenter } = req.body;
    const supervisor = new Supervisor( {name, lastName, password, role, createAt, phone, email, state, ddcenter } );    

    const salt = bcryptjs.genSaltSync();
    supervisor.password = bcryptjs.hashSync( password, salt);

    //Para grabar el registro
    await supervisor.save();

    res.json({
        ok:'true',
        supervisor:supervisor
    });
}

const supervisorsPut = (req, res = response) => {

    const { id } = req.params;
    const _idConditional = {_id : id};
    const { name, lastName, phone, email, state="Activo", ddcenter } = req.body;
    const update = {name: name, lastName: lastName, phone: phone, ddcenter: ddcenter};
    //create_at, state, email,
    Supervisor.findOneAndUpdate(_idConditional, update, {new:true}, (err, supervisorDB ) => {
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
            supervisor: supervisorDB
        });
    })
    
}

const supervisorsStatePut = (req, res = response) => {

    const { id, state } = req.params;
    const _idConditional = {_id : id};
    const update = {state : state};
   // const {create_at, state, email, ...the_rest} = req.body;
    
    Supervisor.findOneAndUpdate(_idConditional, update, {new:true}, (err, supervisorDB ) => {
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
            supervisor: supervisorDB
        });
    })
    
}

module.exports = {
    supervisorsGet,
    supervisorsPost,
    supervisorsPut,
    supervisorsStatePut,
    supervisorsGetById
}