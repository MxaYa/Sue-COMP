import express from 'express';
import Aluno from '../database/Aluno.js';

const router = express.Router();

router.get('/aluno', async (req, res) => {
  try {
    const aluno = await Aluno.findAll({
      raw: true,
    });
    res.send(aluno)
  } catch (error) {
    console.error('Erro ao obter alunos:', error.message);
    res.status(500).json({ message: 'Erro ao obter alunos.', error: error.message });
  }
});

export default router;
