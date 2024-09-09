const express = require('express');
const router = express.Router();
const disciplinaCursoController = require('../Controllers/disciplinaCursoController');

// Rota para obter todas as disciplinas e associações
router.get('/', disciplinaCursoController.getAllDisciplinaCurso);

// Rota para obter uma disciplina pelo ID e ID do curso
router.get('/:id_disciplina/:id_curso', disciplinaCursoController.getDisciplinaById);

module.exports = router;
