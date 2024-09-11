import express from 'express';
import Notas from '../database/Notas.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id_aluno, id_turma, descricao_da_nota, valor_nota, data_da_nota } = req.body;
    const novaNota = await Notas.create({ id_aluno, id_turma, descricao_da_nota, valor_nota, data_da_nota });
    res.status(201).json({ message: 'Nota criada com sucesso!', data: novaNota });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar Nota.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const notas = await Notas.findAll({ raw: true, order: [['id_notas', 'DESC']] });
    if (notas.length === 0) {
      return res.status(404).json({ message: 'Nenhum registro de Nota encontrado!' });
    }
    res.status(200).json({ message: 'Notas obtidas com sucesso!', data: notas });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter Notas.', error: error.message });
  }
});

router.get('/:id_notas', async (req, res) => {
  try {
    const nota = await Notas.findByPk(req.params.id_notas);
    if (!nota) {
      return res.status(404).json({ message: 'Nota não encontrada.' });
    }
    res.status(200).json({ message: 'Nota obtida com sucesso!', data: nota });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter Nota.', error: error.message });
  }
});

router.put('/:id_notas', async (req, res) => {
  const { id_aluno, id_turma, descricao_da_nota, valor_nota, data_da_nota } = req.body;
  try {
    const [updated] = await Notas.update(
      { id_aluno, id_turma, descricao_da_nota, valor_nota, data_da_nota },
      { where: { id_notas: req.params.id_notas }, returning: true, runValidators: true }
    );
    if (updated === 0) {
      return res.status(404).json({ message: 'Nota não encontrada.' });
    }
    const updatedNota = await Notas.findByPk(req.params.id_notas);
    res.status(200).json({ message: 'Nota atualizada com sucesso!', data: updatedNota });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar Nota.', error: error.message });
  }
});

router.delete('/:id_notas', async (req, res) => {
  try {
    const deleted = await Notas.destroy({ where: { id_notas: req.params.id_notas } });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Nota não encontrada.' });
    }
    res.status(200).json({ message: 'Nota deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar Nota.', error: error.message });
  }
});

export default router;
