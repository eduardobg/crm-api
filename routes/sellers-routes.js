const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fields');

const {
    supervisorDniExists,
    sellerDniExists,
    customerEmailExists,
    sellerEmailExists, 
    verifyStatusName, 
    sellerExistsById 
} = require('../helpers/db-validators');

const { 
    sellersGet,
    sellersPost,
    sellersPut,
    sellersStatePut,
    sellersGetById,
    sellersGetByDni
} = require('../controllers/sellers-controllers')

const router = Router();

router.get('/', sellersGet);

router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( sellerExistsById ),

    validateFields
], sellersGetById);

router.get('/dni/:dni',[
    check('dni').not().isEmpty(),
    check('dni').isNumeric(),
    check('dni', 'El DNI debe tener 8 caracteres').isLength( {min:8} ),
    check('dni', 'El DNI debe tener 8 caracteres').isLength( {max:8} ),

    validateFields
], sellersGetByDni);

router.post('/', [
    check('dni').not().isEmpty(),
    check('dni').isNumeric(),
    check('dni', 'El DNI debe tener 8 caracteres').isLength( {min:8} ),
    check('dni', 'El DNI debe tener 8 caracteres').isLength( {max:8} ),
    check('dni').custom(supervisorDniExists),
    check('dni').custom(sellerDniExists),
    check('name', 'Se necesita un Nombre').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength( {min:6} ),
    check('email', 'Se necesita un e-mail').isEmail(),
    check('email').custom(customerEmailExists),
    check('email').custom(sellerEmailExists),
    
    validateFields
],sellersPost);

router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( sellerExistsById ),
    check('dni').not().isEmpty(),
    check('dni').isNumeric(),
    check('dni', 'El DNI debe tener 8 caracteres').isLength( {min:8} ),
    check('dni', 'El DNI debe tener 8 caracteres').isLength( {max:8} ),
    check('dni').custom(supervisorDniExists),
    check('dni').custom(sellerDniExists),
    validateFields
],sellersPut);

router.put('/:id/:state', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( sellerExistsById ),
    check('state').custom( verifyStatusName ),

    validateFields
],sellersStatePut);

module.exports = router;