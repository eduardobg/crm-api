const { response } = require('express');

//const bcryptjs = require('bcryptjs');

const CampaignMessage = require('../models/campaignMessage.js');
const Template = require('../models/template.js');

const config = require('../config');
const client = require('twilio')(config.accountSid, config.authToken);

const campaignMessagesGetById = async(req, res = response) => {

    const{ id } = req.query
    
    const query = { id_seller: id};

    const [total, campaignMessages] = await Promise.all([
        CampaignMessage.count(query),
        CampaignMessage.find(query)

    ]);

    res.json({
        total,
        campaignMessages
    });
}

const campaignMessagePost = async(req, res = response) => {
    //Error validator 
    const { id_seller, id_customer, message, receiver_phone } = req.body;   

    //Para grabar el registro

    try {
        await client.messages.create({
            to: "+51"+receiver_phone,
            from: config.twilioPhone,
            body: message
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: "Error interno: "+error
        });
    }

    const campaignMessage = new CampaignMessage( { id_seller, id_customer, message, receiver_phone } ); 
    await campaignMessage.save();

    res.json({
        ok:'true',
        campaignMessage:campaignMessage
    });
}

const campaignMessageTemplatePost = async(req, res = response) => {
    //Error validator 
    const { id } = req.params;
    const { id_seller, id_customer, receiver_phone } = req.body;   
    const _idConditional = {_id : id};


    Template.findById(_idConditional, (err, templateDB ) => {
        if(err){
            //throw new Error(err);
            return res.status(400).json({
                ok: 'false',
                err
            });
        }

        message = templateDB.message;

        try {
            client.messages.create({
                to: "+51"+receiver_phone,
                from: config.twilioPhone,
                body: message
            })
            
        } catch (error) {
            return res.status(500).json({
                msg: "Error interno: "+error
            });
        }

        const campaignMessage = new CampaignMessage( { id_seller, id_customer, message, receiver_phone } ); 
        campaignMessage.save();
    });

    return res.json({
        ok:'true'
    });
    
}

module.exports = {
    campaignMessagePost,
    campaignMessageTemplatePost,
    campaignMessagesGetById
}