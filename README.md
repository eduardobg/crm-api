PASOS:

npm init -y
touch app.js

================> Agregar esto dentro <================ 

    const express = require('express')
    const app = express()

    app.get('/', function (req, res) {
    res.send('Hello World')
    })

    app.listen(3000)

=========================> <=========================

npm i express dotenv
touch .env

================> Agregar esto dentro <================ 
    PORT=8081
=========================> <=========================

npx nodemon app

npm install cors