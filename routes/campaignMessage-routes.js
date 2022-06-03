const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fields');

const {
    templateExistsById,
    sellerExistsById
} = require('../helpers/db-validators');

const { 
    campaignMessagePost,
    campaignMessageTemplatePost,
    campaignMessagesGetById
} = require('../controllers/campaignMessage-controllers')

const router = Router();


router.post('/', [

    check('id_seller', 'Se necesita un Id de Vendedor').not().isEmpty(),
    check('id_customer', 'Se necesita un Id de Cliente').not().isEmpty(),
    check('message', 'Se necesita un Mensaje').not().isEmpty(),
    check('receiver_phone', 'Se necesita un telefono').not().isEmpty(),
    
    validateFields
],campaignMessagePost);

router.post('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( templateExistsById ),
    check('id_seller', 'Se necesita un Id de Vendedor').not().isEmpty(),
    check('id_customer', 'Se necesita un Id de Cliente').not().isEmpty(),
    check('receiver_phone', 'Se necesita un telefono').not().isEmpty(),
    
    validateFields
],campaignMessageTemplatePost);

router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( sellerExistsById ),

    validateFields
], campaignMessagesGetById);

module.exports = router;