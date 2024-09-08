import Disciplina from "../database/Disciplina.js";
import DisciplinaCurso from "../database/DisciplinaCurso.js";
import Curso from "../database/Curso.js";
import DisciplinaCursoVW from "../database/DisciplinaCursoVW.js";
import express from 'express';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    const disciplinas = await Disciplina.findAll();
    const disciplinaCursos = await DisciplinaCurso.findAll();
    const disciplinaCursosVW = await DisciplinaCursoVW.findAll();
    res.status(200).json({
      message: "Associação de curso e disciplina obtidas com sucesso!",
      data: disciplinas,
      cursos,
      disciplinaCursos,
      disciplinaCursosVW,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao obter Associação de curso e disciplina.",
      error: error.message,
    });
  }
});


router.get('/:id_disciplina/:id_curso', async (req, res) => {
  try {
    const { id_disciplina, id_curso } = req.params;

    const disciplinaCurso = await DisciplinaCurso.findOne({
      where: { id_disciplina, id_curso },
      include: [
        { model: Disciplina, as: 'Disciplina' },
        { model: Curso, as: 'Curso' }
      ]
    });

    if (!disciplinaCurso) {
      return res.status(404).json({ message: "Associação de curso e disciplina não encontrada." });
    }

    res.status(200).json({
      message: "Associação de curso e disciplina obtida com sucesso!",
      data: disciplinaCurso,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao obter Associação de curso e disciplina.",
      error: error.message,
    });
  }
});


router.delete('/:id_disciplina/:id_curso', async (req, res) => {
  try {
    const { id_disciplina, id_curso } = req.params;

    const rowsDeleted = await DisciplinaCurso.destroy({
      where: { id_disciplina, id_curso },
    });

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Associação de curso e disciplina não encontrada." });
    }

    res.status(200).json({
      message: "Associação de curso e disciplina deletada com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao deletar Associação de curso e disciplina.",
      error: error.message,
    });
  }
});

export default router;
