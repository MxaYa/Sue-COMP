import express from 'express';
import Ass_aluno_turma from "../database/Ass_Aluno_turma.js";

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { id_aluno, id_turma } = req.body;
    const criar_associacao = await Ass_aluno_turma.create({
      id_aluno,
      id_turma,
    });
    res.status(201).json({ message: "Associação Aluno-Turma criada com sucesso!", data: criar_associacao });
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar Associação Aluno-Turma.", error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const rowsAssociacao = await Ass_aluno_turma.findAll({
      raw: true,
      order: [["id_aluno_turma", "DESC"]],
    });
    if (rowsAssociacao.length === 0) {
      return res.status(404).json({ message: "Nenhuma associação Aluno-Turma encontrada!" });
    }
    res.status(200).json({ message: "Associações Aluno-Turma obtidas com sucesso!", data: rowsAssociacao });
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter Associações Aluno-Turma.", error: error.message });
  }
});


router.get('/:id_aluno_turma', async (req, res) => {
  try {
    const associacao = await Ass_aluno_turma.findByPk(req.params.id_aluno_turma);
    if (!associacao) {
      return res.status(404).json({ message: "Associação Aluno-Turma não encontrada." });
    }
    res.status(200).json({ message: "Associação Aluno-Turma obtida com sucesso!", data: associacao });
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter Associação Aluno-Turma.", error: error.message });
  }
});



router.delete('/:id_aluno_turma', async (req, res) => {
  try {
    const associacaoDeletada = await Ass_aluno_turma.destroy({
      where: { id_aluno_turma: req.params.id_aluno_turma },
    });
    if (associacaoDeletada === 0) {
      return res.status(404).json({ message: "Associação Aluno-Turma não encontrada." });
    }
    res.status(200).json({ message: "Associação Aluno-Turma deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar Associação Aluno-Turma.", error: error.message });
  }
});

export default router;
