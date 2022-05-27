const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fields');

const {
    customerEmailExists,
    sellerEmailExists, 
    supervisorEmailExists, 
    verifyStatusName, 
    supervisorExistsById 
} = require('../helpers/db-validators');

const { 
    supervisorsGet,
    supervisorsPost,
    supervisorsPut,
    supervisorsStatePut,
    supervisorsGetById
} = require('../controllers/supervisors-controllers')

const router = Router();

router.get('/', supervisorsGet);

router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( supervisorExistsById ),

    validateFields
], supervisorsGetById);

router.post('/', [
    check('name', 'Se necesita un Nombre').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength( {min:6} ),
    check('email', 'Se necesita un e-mail').isEmail(),
    check('email').custom(customerEmailExists),
    check('email').custom(sellerEmailExists),
    check('email').custom(supervisorEmailExists),
    
    validateFields
],supervisorsPost);

router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( supervisorExistsById ),

    validateFields
],supervisorsPut);

router.put('/:id/:state', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( supervisorExistsById ),
    check('state').custom( verifyStatusName ),

    validateFields
],supervisorsStatePut);

module.exports = router;