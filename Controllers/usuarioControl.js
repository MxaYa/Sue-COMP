import express from 'express';
import Usuario from '../database/Usuario.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nome, telefone, email, cpf, id_endereco } = req.body;
    const criarUsuario = await Usuario.create({
      nome,
      telefone,
      email,
      cpf,
      id_endereco,
    });
    res.status(201).json({ message: 'Usuário criado com sucesso!', data: criarUsuario });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar usuário.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      raw: true,
      order: [['id_usuario', 'DESC']],
    });
    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
    }
    res.status(200).json({ message: 'Usuários obtidos com sucesso!', data: usuarios });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuários.', error: error.message });
  }
});

router.get('/:id_usuario', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id_usuario);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json({ message: 'Usuário obtido com sucesso!', data: usuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuário.', error: error.message });
  }
});

router.put('/:id_usuario', async (req, res) => {
  const { nome, telefone, email, cpf, id_endereco } = req.body;
  try {
    const [updated] = await Usuario.update(
      { nome, telefone, email, cpf, id_endereco },
      { where: { id_usuario: req.params.id_usuario } }
    );
    if (updated === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    const updatedUsuario = await Usuario.findByPk(req.params.id_usuario);
    res.status(200).json({ message: 'Usuário atualizado com sucesso!', data: updatedUsuario });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar usuário.', error: error.message });
  }
});

router.delete('/:id_usuario', async (req, res) => {
  try {
    const deleted = await Usuario.destroy({
      where: { id_usuario: req.params.id_usuario },
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário.', error: error.message });
  }
});

export default router;
