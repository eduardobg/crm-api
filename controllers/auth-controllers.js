const { response } = require('express');


const login = (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        if(email!="admin@gmail.com"){
            return res.status(400).json({
                msg: "Error: Correo no válido"
            })
        }
        if(password!="admin123456"){
            return res.status(400).json({
                msg: "Error: Contraseña incorrecta"
            })
        }

        res.json({
            msg: "Acceso concedido"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno: Contactese con el administrador :c"
        });
    }
}

module.exports={
    login
}