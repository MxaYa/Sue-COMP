import express from 'express';
import Pagamento from '../database/Pagamento.js';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { rep_financeiro_id, valor_pago, data_pago, descricao, tipo_desconto, numero_parcela } = req.body;
    const criarPagamento = await Pagamento.create({
      rep_financeiro_id,
      valor_pago,
      data_pago,
      descricao,
      tipo_desconto,
      numero_parcela,
    });
    res.status(201).json({ message: 'Pagamento criado com sucesso!', data: criarPagamento });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar pagamento.', error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll({
      raw: true,
      order: [['id_pagamento', 'DESC']],
    });
    if (pagamentos.length === 0) {
      return res.status(404).json({ message: 'Nenhum pagamento encontrado.' });
    }
    res.status(200).json({ message: 'Pagamentos obtidos com sucesso!', data: pagamentos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter pagamentos.', error: error.message });
  }
});


router.get('/:id_pagamento', async (req, res) => {
  try {
    const pagamento = await Pagamento.findByPk(req.params.id_pagamento);
    if (!pagamento) {
      return res.status(404).json({ message: 'Pagamento não encontrado.' });
    }
    res.status(200).json({ message: 'Pagamento obtido com sucesso!', data: pagamento });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter pagamento.', error: error.message });
  }
});


router.put('/:id_pagamento', async (req, res) => {
  const { rep_financeiro_id, valor_pago, data_pago, descricao, tipo_desconto, numero_parcela } = req.body;
  try {
    const [updated] = await Pagamento.update(
      { rep_financeiro_id, valor_pago, data_pago, descricao, tipo_desconto, numero_parcela },
      { where: { id_pagamento: req.params.id_pagamento } }
    );
    if (updated === 0) {
      return res.status(404).json({ message: 'Pagamento não encontrado.' });
    }
    const updatedPagamento = await Pagamento.findByPk(req.params.id_pagamento);
    res.status(200).json({ message: 'Pagamento atualizado com sucesso!', data: updatedPagamento });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar pagamento.', error: error.message });
  }
});


router.delete('/:id_pagamento', async (req, res) => {
  try {
    const deleted = await Pagamento.destroy({
      where: { id_pagamento: req.params.id_pagamento },
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Pagamento não encontrado.' });
    }
    res.status(200).json({ message: 'Pagamento deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar pagamento.', error: error.message });
  }
});

export default router;
