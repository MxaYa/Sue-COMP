import express from 'express';
import Frequencia from '../database/Frequencia.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id_aluno, id_turma, Data_Frequencia, Presenca } = req.body;
    const novaFrequencia = await Frequencia.create({ id_aluno, id_turma, Data_Frequencia, Presenca });
    res.status(201).json({ message: 'Frequência criada com sucesso!', data: novaFrequencia });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar Frequência.', error: error.message });
  }
});

router.get('/:id_frequencia', async (req, res) => {
  try {
    const frequencia = await Frequencia.findByPk(req.params.id_frequencia);
    if (!frequencia) {
      return res.status(404).json({ message: 'Frequência não encontrada.' });
    }
    res.status(200).json({ message: 'Frequência obtida com sucesso!', data: frequencia });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter Frequência.', error: error.message });
  }
});

router.put('/:id_frequencia', async (req, res) => {
  const { id_aluno, id_turma, Data_Frequencia, Presenca } = req.body;
  try {
    const [updated] = await Frequencia.update(
      { id_aluno, id_turma, Data_Frequencia, Presenca },
      { where: { id_frequencia: req.params.id_frequencia }, returning: true, runValidators: true }
    );
    if (updated === 0) {
      return res.status(404).json({ message: 'Frequência não encontrada.' });
    }
    const updatedFrequencia = await Frequencia.findByPk(req.params.id_frequencia);
    res.status(200).json({ message: 'Frequência atualizada com sucesso!', data: updatedFrequencia });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar Frequência.', error: error.message });
  }
});

router.delete('/:id_frequencia', async (req, res) => {
  try {
    const deleted = await Frequencia.destroy({ where: { id_frequencia: req.params.id_frequencia } });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Frequência não encontrada.' });
    }
    res.status(200).json({ message: 'Frequência deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar Frequência.', error: error.message });
  }
});

export default router;
