const express = require('express')
const cors = require('cors')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Middlewares
        this.middleware();
        //Routes
        this.routes();
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