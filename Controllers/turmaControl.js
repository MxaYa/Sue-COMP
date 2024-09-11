import express from 'express';
import Turma from '../database/Turma.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id_curso, id_disciplina, horario } = req.body;
    const criarTurma = await Turma.create({
      id_curso,
      id_disciplina,
      horario,
    });
    res.status(201).json({ message: 'Turma criada com sucesso!', data: criarTurma });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar turma.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const turmas = await Turma.findAll({
      raw: true,
      order: [['id_turma', 'DESC']],
    });
    if (turmas.length === 0) {
      return res.status(404).json({ message: 'Nenhuma turma encontrada.' });
    }
    res.status(200).json({ message: 'Turmas obtidas com sucesso!', data: turmas });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter turmas.', error: error.message });
  }
});

router.get('/:id_turma', async (req, res) => {
  try {
    const turma = await Turma.findByPk(req.params.id_turma);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }
    res.status(200).json({ message: 'Turma obtida com sucesso!', data: turma });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter turma.', error: error.message });
  }
});

router.put('/:id_turma', async (req, res) => {
  const { id_curso, id_disciplina, horario } = req.body;
  try {
    const [updated] = await Turma.update(
      { id_curso, id_disciplina, horario },
      { where: { id_turma: req.params.id_turma } }
    );
    if (updated === 0) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }
    const updatedTurma = await Turma.findByPk(req.params.id_turma);
    res.status(200).json({ message: 'Turma atualizada com sucesso!', data: updatedTurma });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar turma.', error: error.message });
  }
});

router.delete('/:id_turma', async (req, res) => {
  try {
    const deleted = await Turma.destroy({
      where: { id_turma: req.params.id_turma },
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }
    res.status(200).json({ message: 'Turma deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar turma.', error: error.message });
  }
});

export default router;
