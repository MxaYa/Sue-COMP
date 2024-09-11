const express = require('express');
const Valor_curso = require('../database/Valor_curso');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id_curso, valor, turno } = req.body;
    const criarValorCurso = await Valor_curso.create({
      id_curso,
      valor,
      turno,
    });
    res.status(201).json({ message: 'Valor de curso criado com sucesso!', data: criarValorCurso });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar valor de curso.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const valoresCurso = await Valor_curso.findAll({
      raw: true,
      order: [['id_valor_curso', 'DESC']],
    });
    if (valoresCurso.length === 0) {
      return res.status(404).json({ message: 'Nenhum valor de curso encontrado.' });
    }
    res.status(200).json({ message: 'Valores de curso obtidos com sucesso!', data: valoresCurso });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter valores de curso.', error: error.message });
  }
});

router.get('/:id_valor_curso', async (req, res) => {
  try {
    const valorCurso = await Valor_curso.findByPk(req.params.id_valor_curso);
    if (!valorCurso) {
      return res.status(404).json({ message: 'Valor de curso não encontrado.' });
    }
    res.status(200).json({ message: 'Valor de curso obtido com sucesso!', data: valorCurso });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter valor de curso.', error: error.message });
  }
});

router.put('/:id_valor_curso', async (req, res) => {
  const { id_curso, valor, turno } = req.body;
  try {
    const [updated] = await Valor_curso.update(
      { id_curso, valor, turno },
      { where: { id_valor_curso: req.params.id_valor_curso } }
    );
    if (updated === 0) {
      return res.status(404).json({ message: 'Valor de curso não encontrado.' });
    }
    const updatedValorCurso = await Valor_curso.findByPk(req.params.id_valor_curso);
    res.status(200).json({ message: 'Valor de curso atualizado com sucesso!', data: updatedValorCurso });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar valor de curso.', error: error.message });
  }
});

router.delete('/:id_valor_curso', async (req, res) => {
  try {
    const deleted = await Valor_curso.destroy({
      where: { id_valor_curso: req.params.id_valor_curso },
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Valor de curso não encontrado.' });
    }
    res.status(200).json({ message: 'Valor de curso deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar valor de curso.', error: error.message });
  }
});

module.exports = router;
