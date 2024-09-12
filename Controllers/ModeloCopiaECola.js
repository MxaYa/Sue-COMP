import express from 'express';
import Disciplina  from '../database/Disciplina.js';

const router = express.Router();


router.post('/', async (req, res) => {
  const { nome_disciplina, valor_disciplina, descricao_disciplina } = req.body;
  try {
    const disciplina = await Disciplina.create({
      nome_disciplina,
      valor_disciplina,
      descricao_disciplina,
    });
    res
      .status(201)
      .json({ message: "Disciplina criada com sucesso!", data: disciplina });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao criar Disciplina.", error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const disciplina = await Disciplina.findAll({
      raw: true,
      order: [["id_disciplina", "DESC"]],
    });
    res
      .status(200)
      .json({ message: "Disciplinas obtidos com sucesso!", data: disciplina });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter Disciplinas.", error: error.message });
  }
});


router.get('/:id_disciplina', async (req, res) => {
  try {
    const disciplina = await Disciplina.findByPk(req.params.id_disciplina);
    if (!disciplina) {
      return res.status(404).json({ message: "Disciplina não encontrado." });
    }
    res
      .status(200)
      .json({ message: "Disciplina obtido com sucesso!", data: disciplina });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter Disciplina.", error: error.message });
  }
});


router.put('/:id_disciplina', async (req, res) => {
  const { nome_disciplina, valor_disciplina, descricao_disciplina } = req.body;
  const { id_disciplina } = req.params;
  try {
    const [rowsUpdated, [updatedDisciplina]] = await Disciplina.update(
      { nome_disciplina, valor_disciplina, descricao_disciplina },
      { where: { id_disciplina }, returning: true, runValidators: true },
    );
    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "Disciplina não encontrada." });
    }
    res.status(200).json({
      message: "Disciplina atualizada com sucesso!",
      data: updatedDisciplina,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar disciplina.", error: error.message });
  }
});


router.delete('/:id_disciplina', async (req, res) => {
  const { id_disciplina } = req.params;
  try {
    const rowsDeleted = await Disciplina.destroy({
      where: { id_disciplina },
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Disciplina não encontrada." });
    }
    res.status(200).json({ message: "Disciplina deletado com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar Disciplina.", error: error.message });
  }
});

export default router;
