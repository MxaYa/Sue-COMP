import express from 'express';
import Endereco from '../database/Endereco.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { rua, bairro, cidade, estado, pais, cep } = req.body;
    const novoEndereco = await Endereco.create({ rua, bairro, cidade, estado, pais, cep });
    res.status(201).json({ message: 'Endereço criado com sucesso!', data: novoEndereco });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar Endereço.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const enderecos = await Endereco.findAll({ raw: true, order: [['id_endereco', 'DESC']] });
    if (enderecos.length === 0) {
      return res.status(404).json({ message: 'Nenhum Endereço encontrado!' });
    }
    res.status(200).json({ message: 'Endereços obtidos com sucesso!', data: enderecos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter Endereços.', error: error.message });
  }
});

router.get('/:id_endereco', async (req, res) => {
  try {
    const endereco = await Endereco.findByPk(req.params.id_endereco);
    if (!endereco) {
      return res.status(404).json({ message: 'Endereço não encontrado.' });
    }
    res.status(200).json({ message: 'Endereço obtido com sucesso!', data: endereco });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter Endereço.', error: error.message });
  }
});

router.put('/:id_endereco', async (req, res) => {
  const { rua, bairro, cidade, estado, pais, cep } = req.body;
  try {
    const [updated] = await Endereco.update(
      { rua, bairro, cidade, estado, pais, cep },
      { where: { id_endereco: req.params.id_endereco }, returning: true, runValidators: true }
    );
    if (updated === 0) {
      return res.status(404).json({ message: 'Endereço não encontrado.' });
    }
    const enderecoAtualizado = await Endereco.findByPk(req.params.id_endereco);
    res.status(200).json({ message: 'Endereço atualizado com sucesso!', data: enderecoAtualizado });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar Endereço.', error: error.message });
  }
});

router.delete('/:id_endereco', async (req, res) => {
  try {
    const enderecoDeletado = await Endereco.destroy({ where: { id_endereco: req.params.id_endereco } });
    if (enderecoDeletado === 0) {
      return res.status(404).json({ message: 'Endereço não encontrado.' });
    }
    res.status(200).json({ message: 'Endereço deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar Endereço.', error: error.message });
  }
});

export default router;
