const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');

// Rota para criar uma nova disciplina
router.post('/', disciplinaController.createDisciplina);

// Rota para obter todas as disciplinas
router.get('/', disciplinaController.getAllDisciplina);

// Rota para obter uma disciplina pelo ID
router.get('/:id_disciplina', disciplinaController.getDisciplinaById);

// Rota para atualizar uma disciplina pelo ID
router.put('/:id_disciplina', disciplinaController.updateDisciplinaById);

// Rota para deletar uma disciplina pelo ID
router.delete('/:id_disciplina', disciplinaController.deleteDisciplina);

module.exports = router;
