const express = require('express');
const router = express.Router();
const coordenadorController = require('../controllers/coordenadorControl');

// Rota para criar um novo coordenador
router.post('/', coordenadorController.createCoordenador);

// Rota para obter todos os coordenadores
router.get('/', coordenadorController.getAllCoordenadores);

// Rota para obter um coordenador pelo ID
router.get('/:id', coordenadorController.getCoordenadorById);

// Rota para atualizar um coordenador pelo ID
router.put('/:id', coordenadorController.updateCoordenador);

// Rota para remover um coordenador pelo ID
router.delete('/:id', coordenadorController.deleteCoordenador);

module.exports = router;
