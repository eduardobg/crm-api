const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Distribution = require('../models/distribution.js');
//const { use } = require('express/lib/application');

const distributionsGet = async(req, res = response) => {

    const{ limit=10, from=0 } = req.query
    //const query = { state: "Activo"};

    const [total, distributions] = await Promise.all([
        Distribution.count(),
        Distribution.find()
            .skip(from)
            .limit(limit)
    ]);

    res.json({
        total,
        distributions //HERE
    });
}

const distributionsGetById = async(req, res = response) => {

    const { id } = req.params;
    const _idConditional = {_id : id};

    Distribution.findById(_idConditional, (err, distributionDB ) => {
        if(err){
            //throw new Error(err);
            return res.status(400).json({
                ok: 'false',
                err
            });
        }
        return res.json({
            ok:'true',
            distribution: distributionDB
        });
    });

}

const distributionsPost = async(req, res = response) => {

    //Error validator 
    const { name, address, district, province, department } = req.body;
    const distribution = new Distribution( {name, address, district, province, department } );    

    //Para grabar el registro
    await distribution.save();

    res.json({
        ok:'true',
        distribution:distribution
    });
}

const distributionsPut = (req, res = response) => {

    const { id } = req.params;
    const _idConditional = {_id : id};
    const { name, address, district, province, department } = req.body;
    const update = {name: name, address: address, district: district, province: province, department:department };
    //create_at, state, email,
    Distribution.findOneAndUpdate(_idConditional, update, {new:true}, (err, distributionDB ) => {
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
            distributionDB: distributionDB
        });
    })
    
}

module.exports = {
    distributionsGet,
    distributionsPost,
    distributionsPut,
    distributionsGetById
}