import express from 'express';
import Rep_financeiro from '../database/Rep_financeiro.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id_login, data_transacao, descricao } = req.body;
    const criarRepFinanceiro = await Rep_financeiro.create({
      id_login,
      data_transacao,
      descricao,
    });
    res.status(201).json({ message: 'Representante financeiro criado com sucesso!', data: criarRepFinanceiro });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar representante financeiro.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const representantes = await Rep_financeiro.findAll({
      raw: true,
      order: [['id_rep_financeiro', 'DESC']],
    });
    if (representantes.length === 0) {
      return res.status(404).json({ message: 'Nenhum representante financeiro encontrado.' });
    }
    res.status(200).json({ message: 'Representantes financeiros obtidos com sucesso!', data: representantes });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter representantes financeiros.', error: error.message });
  }
});

router.get('/:id_rep_financeiro', async (req, res) => {
  try {
    const representante = await Rep_financeiro.findByPk(req.params.id_rep_financeiro);
    if (!representante) {
      return res.status(404).json({ message: 'Representante financeiro não encontrado.' });
    }
    res.status(200).json({ message: 'Representante financeiro obtido com sucesso!', data: representante });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter representante financeiro.', error: error.message });
  }
});

router.put('/:id_rep_financeiro', async (req, res) => {
  const { id_login, data_transacao, descricao } = req.body;
  try {
    const [updated] = await Rep_financeiro.update(
      { id_login, data_transacao, descricao },
      { where: { id_rep_financeiro: req.params.id_rep_financeiro } }
    );
    if (updated === 0) {
      return res.status(404).json({ message: 'Representante financeiro não encontrado.' });
    }
    const updatedRepFinanceiro = await Rep_financeiro.findByPk(req.params.id_rep_financeiro);
    res.status(200).json({ message: 'Representante financeiro atualizado com sucesso!', data: updatedRepFinanceiro });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar representante financeiro.', error: error.message });
  }
});

router.delete('/:id_rep_financeiro', async (req, res) => {
  try {
    const deleted = await Rep_financeiro.destroy({
      where: { id_rep_financeiro: req.params.id_rep_financeiro },
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Representante financeiro não encontrado.' });
    }
    res.status(200).json({ message: 'Representante financeiro deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar representante financeiro.', error: error.message });
  }
});

export default router;
