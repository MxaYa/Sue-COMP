
/**Carlos
 * Rota para disciplina
 */
 const express = require('express');
 const router = express.Router();
 const disciplinaController = require('../controllers/disciplinaController');
 
 // Definir rotas para disciplina
 router.post('/', disciplinaController.createDisciplina);
 router.get('/:id', disciplinaController.getDisciplinaById);
 router.put('/:id', disciplinaController.updateDisciplina);
 router.delete('/:id', disciplinaController.deleteDisciplina);
 
 module.exports = router;
 