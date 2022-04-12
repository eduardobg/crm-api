const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Conectarse a la BD
        this.conectarDB();
        //Middlewares
        this.middleware();
        //Routes
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){
        //CORS
        this.app.use(cors());

        //Lecura y parse del body
        this.app.use(express.json());

        //Directorio Público
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/users-routes'));
    }

    listen(){
        this.app.listen(process.env.PORT, ()=> {
            console.log('Servidor corrienndo en puerto: ', process.env.PORT);
        })
    }
}

module.exports = Server;