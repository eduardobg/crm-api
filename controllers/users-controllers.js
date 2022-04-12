const { response } = require('express');

const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usuariosGet = (req, res = response) => {

    const{ q,nombre='No name',apikey, page='1', limit='no limit' } = req.query

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = async(req, res = response) => {

    //Error validator 


    const { name, email, password, role } = req.body;
    const user = new User( {name, email, password, role} );    

    //Verificar si el correo existe
    const emailExists = await User.findOne( {email} );
    if( emailExists ){
        return res.status(400).json({
            Error: "Email exists! Try another"
        });
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    //Para grabar el registro
    await user.save();

    res.json({
        user
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - Controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}