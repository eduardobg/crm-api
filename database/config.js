const mongoose = require('mongoose');

const dbConnection = async() => {

    try{
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });

        console.log('Conexion establecida con MongoDB Atlas');

    } catch(error){
        console.log(error);
        throw new Error('Error al tratar de conectarse con MongoDB Atlas')
    }
}

module.exports = {
    dbConnection
}