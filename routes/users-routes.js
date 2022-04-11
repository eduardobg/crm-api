const { Router } = require('express')

const { 
    usuariosGet, 
    usuariosPatch, 
    usuariosDelete, 
    usuariosPut, 
    usuariosPost

} = require('../controllers/users-controllers')

const router = Router();

router.get('/', usuariosGet);
router.post('/', usuariosPost);
router.put('/:id', usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/', usuariosDelete);

module.exports = router;