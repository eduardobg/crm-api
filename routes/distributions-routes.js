const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fields');

const {
    distributionExistsById
} = require('../helpers/db-validators');

const { 
    distributionsGet,
    distributionsPost,
    distributionsPut,
    distributionsGetById
} = require('../controllers/distributions-controllers')

const router = Router();

router.get('/', distributionsGet);

router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( distributionExistsById ),

    validateFields
], distributionsGetById);

router.post('/', [
    check('name', 'Se necesita un Nombre').not().isEmpty(),
    check('address', 'Se necesita una Direccion').not().isEmpty(),
    check('district', 'Se necesita un Distrito').not().isEmpty(),
    check('province', 'Se necesita una Provincia').not().isEmpty(),
    check('department', 'Se necesita un Departamento').not().isEmpty(),
    
    validateFields
],distributionsPost);

router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( distributionExistsById ),

    validateFields
],distributionsPut);


module.exports = router;