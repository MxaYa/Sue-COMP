import express from 'express';
import Curso from '../database/Curso.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nome_curso, id_coordenador } = req.body;
    const novoCurso = await Curso.create({ nome_curso, id_coordenador });
    res.status(201).json({ message: 'Curso criado com sucesso!', data: novoCurso });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar Curso.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const cursos = await Curso.findAll({ raw: true, order: [['id_curso', 'DESC']] });
    if (cursos.length === 0) {
      return res.status(404).json({ message: 'Nenhum Curso encontrado!' });
    }
    res.status(200).json({ message: 'Cursos obtidos com sucesso!', data: cursos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter Cursos.', error: error.message });
  }
});

router.get('/:id_curso', async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id_curso);
    if (!curso) {
      return res.status(404).json({ message: 'Curso não encontrado.' });
    }
    res.status(200).json({ message: 'Curso obtido com sucesso!', data: curso });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter Curso.', error: error.message });
  }
});

router.put('/:id_curso', async (req, res) => {
  const { nome_curso, id_coordenador } = req.body;
  try {
    const [updated] = await Curso.update(
      { nome_curso, id_coordenador },
      { where: { id_curso: req.params.id_curso }, returning: true, runValidators: true }
    );
    if (updated === 0) {
      return res.status(404).json({ message: 'Curso não encontrado.' });
    }
    const cursoAtualizado = await Curso.findByPk(req.params.id_curso);
    res.status(200).json({ message: 'Curso atualizado com sucesso!', data: cursoAtualizado });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar Curso.', error: error.message });
  }
});

router.delete('/:id_curso', async (req, res) => {
  try {
    const cursoDeletado = await Curso.destroy({ where: { id_curso: req.params.id_curso } });
    if (cursoDeletado === 0) {
      return res.status(404).json({ message: 'Curso não encontrado.' });
    }
    res.status(200).json({ message: 'Curso deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar Curso.', error: error.message });
  }
});

export default router;
