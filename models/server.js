const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/api/auth';
        this.customerPath = '/api/customers';
        this.sellerPath = '/api/sellers';
        

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
        this.app.use(this.authPath, require('../routes/auth-routes'));
        this.app.use(this.customerPath, require('../routes/customers-routes'));
        this.app.use(this.sellerPath, require('../routes/sellers-routes'));
    }

    listen(){
        this.app.listen(process.env.PORT, ()=> {
            console.log('Servidor corrienndo en puerto: ', process.env.PORT);
        })
    }
}

module.exports = Server;