
/** Carlos
 * Novas importacoes
 */
const express = require('express');
const {Disciplina} = require("../database/Disciplina");
const DisciplinaCurso = require("../database/DisciplinaCurso");
const Curso = require("../database/Curso");
const DisciplinaCursoVW = require("../database/DisciplinaCursoVW");


// READ - Obtém todas as Disciplinas
exports.getAllDisciplinaCurso = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    const disciplinas = await Disciplina.findAll();
    const disciplinaCursos = await DisciplinaCurso.findAll();
    const disciplinaCursosVW = await DisciplinaCursoVW.findAll();
    res
      .status(200)
      .json({
        message: "Associação de curso e disciplina obtidas com sucesso!",
        data: disciplinas,
        cursos,
        disciplinaCursos,
        disciplinaCursosVW,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erro ao obter Associação de curso e disciplina.",
        error: error.message,
      });
  }
};

// READ - Obtém uma Disciplina pelo ID
//Rota Abaixo em manutenção, ainda não sei como fazer
/*exports.getDisciplinaById = async (req, res) => {
  try {
    const disciplinaCurso = await DisciplinaCurso.findByPk(id_disciplina, id_curso {
        include: [
            {model: Disciplina, as: 'Disciplina'},
            {model: Curso, as: 'Curso'}
        ]
    });



    res
      .status(200)
      .json({ message: "Associação de curso e disciplina obtida com sucesso!", data: disciplina });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter Associação de curso e disciplina.", error: error.message });
  }
};*/







/**
 *Carlos
 */
exports.getDisciplinaById = async (req, res) => {
  try {
    const id_disciplina = req.params.id_disciplina;
    const id_curso = req.params.id_curso;

    const disciplinaCurso = await DisciplinaCurso.findOne({
      where: { id_disciplina: id_disciplina, id_curso: id_curso },
      include: [
        { model: Disciplina, as: 'Disciplina' },
        { model: Curso, as: 'Curso' }
      ]
    });

    if (!disciplinaCurso) {
      return res
        .status(404)
        .json({ message: "Associação de curso e disciplina não encontrada." });
    }

    res
      .status(200)
      .json({ message: "Associação de curso e disciplina obtida com sucesso!", data: disciplinaCurso });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter Associação de curso e disciplina.", error: error.message });
  }
};



