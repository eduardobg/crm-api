const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fields');

const { 
    templateExistsById 
} = require('../helpers/db-validators');

const { 
    templatesGet,
    templatesPost,
    templatesPut,
    templatesGetById,
    templatesDelete
} = require('../controllers/templates-controllers')

const router = Router();

router.get('/', templatesGet);

router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( templateExistsById ),

    validateFields
], templatesGetById);

router.post('/', [
    check('title', 'Se necesita un Titulo').not().isEmpty(),
    check('message', 'Se necesita un Mensaje').not().isEmpty(),
    check('priority', 'Se necesita una Prioridad').not().isEmpty(),
    check('createAt', 'Se necesita una Fecha de creacion').not().isEmpty(),
    check('ddcenter', 'Se necesita un Centro de distribucion').not().isEmpty(),
    check('author', 'Se necesita un Autor').not().isEmpty(),
    
    validateFields
],templatesPost);

router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( templateExistsById ),

    validateFields
],templatesPut);

router.delete('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( templateExistsById ),

    validateFields
],templatesDelete);

module.exports = router;