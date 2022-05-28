const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Template = require('../models/template.js');
//const { use } = require('express/lib/application');

const templatesGet = async(req, res = response) => {

    const{ limit=10, from=0 } = req.query
    //const query = { state: "Activo"};

    const [total, templates] = await Promise.all([
        Template.count(),
        Template.find()
            .skip(from)
            .limit(limit)
    ]);

    res.json({
        total,
        templates //HERE
    });
}

const templatesGetById = async(req, res = response) => {

    const { id } = req.params;
    const _idConditional = {_id : id};

    Template.findById(_idConditional, (err, templateDB ) => {
        if(err){
            //throw new Error(err);
            return res.status(400).json({
                ok: 'false',
                err
            });
        }
        return res.json({
            ok:'true',
            template: templateDB
        });
    });

}

const templatesPost = async(req, res = response) => {

    //Error validator 
    const { title, message, priority, createAt, ddcenter,author } = req.body;
    const template = new Template( {title, message, priority, createAt, ddcenter, author } );    

    //Para grabar el registro
    await template.save();

    res.json({
        ok:'true',
        template:template
    });
}

const templatesPut = (req, res = response) => {

    const { id } = req.params;
    const _idConditional = {_id : id};
    const { title, message} = req.body;
    const update = {title: title, message: message };
    //create_at, state, email,
    Template.findOneAndUpdate(_idConditional, update, {new:true}, (err, templateDB ) => {
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
            templateDB: templateDB
        });
    })
    
}
const templatesDelete = (req, res = response) => {

    const { id } = req.params;
    const _idConditional = {_id : id};

    Template.findOneAndRemove(_idConditional, (err, templateDB ) => {
        if(err){
            //throw new Error(err);
            return res.status(400).json({
                ok: 'false',
                err
            });
        }
        return res.json({
            delete:'true',
            template: templateDB
        });
    });
}
module.exports = {
    templatesGet,
    templatesPost,
    templatesPut,
    templatesGetById,
    templatesDelete
}