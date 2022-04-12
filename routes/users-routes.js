const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fields');

const { 
    usuariosGet, 
    usuariosPatch, 
    usuariosDelete, 
    usuariosPut, 
    usuariosPost

} = require('../controllers/users-controllers')

const router = Router();

router.get('/', usuariosGet);
router.post('/', [
    check('name', 'Name is a required camp').not().isEmpty(),
    check('password', 'The password must be at least 6 characters').isLength( {min:6} ),
    check('email', 'Email format is not valid').isEmail(),
    check('role', 'Role not valid').isIn( ['ADMIN_ROLE','USER_ROLE'] ),

    //Invocamos al middleware
    validateFields
],usuariosPost);
router.put('/:id', usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/', usuariosDelete);

module.exports = router;