const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fields');

const { customerEmailExists, verifyStatusName, customerExistsById } = require('../helpers/db-validators');

const { 
    sellersGet, 
    sellersPost
} = require('../controllers/sellers-controllers')

const router = Router();

router.get('/', customersGet);

router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( customerExistsById ),

    validateFields
], customerGetById);

router.post('/', [
    check('name', 'Se necesita un Nombre').not().isEmpty(),
    check('email', 'Se necesita un e-mail').isEmail(),
    check('email').custom(customerEmailExists),
    
    validateFields
],customersPost);

router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( customerExistsById ),

    validateFields
],customersPut);

router.put('/:id/:state', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( customerExistsById ),
    check('state').custom( verifyStatusName ),

    validateFields
],customersStatePut);

module.exports = router;