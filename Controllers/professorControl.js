import express from 'express';
import Professor from '../database/professor.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { area_de_ensino, id_login } = req.body;
    const criarProfessor = await Professor.create({
      area_de_ensino,
      id_login,
    });
    res.status(201).json({ message: 'Professor criado com sucesso!', data: criarProfessor });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar professor.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const professores = await Professor.findAll({
      raw: true,
      order: [['id_professor', 'DESC']],
    });
    if (professores.length === 0) {
      return res.status(404).json({ message: 'Nenhum professor encontrado.' });
    }
    res.status(200).json({ message: 'Professores obtidos com sucesso!', data: professores });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter professores.', error: error.message });
  }
});

router.get('/:id_professor', async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id_professor);
    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado.' });
    }
    res.status(200).json({ message: 'Professor obtido com sucesso!', data: professor });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter professor.', error: error.message });
  }
});

router.put('/:id_professor', async (req, res) => {
  const { area_de_ensino, id_login } = req.body;
  try {
    const [updated] = await Professor.update(
      { area_de_ensino, id_login },
      { where: { id_professor: req.params.id_professor } }
    );
    if (updated === 0) {
      return res.status(404).json({ message: 'Professor não encontrado.' });
    }
    const updatedProfessor = await Professor.findByPk(req.params.id_professor);
    res.status(200).json({ message: 'Professor atualizado com sucesso!', data: updatedProfessor });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar professor.', error: error.message });
  }
});

router.delete('/:id_professor', async (req, res) => {
  try {
    const deleted = await Professor.destroy({
      where: { id_professor: req.params.id_professor },
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Professor não encontrado.' });
    }
    res.status(200).json({ message: 'Professor deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar professor.', error: error.message });
  }
});

export default router;
