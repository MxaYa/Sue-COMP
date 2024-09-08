import express from 'express';
import Coordenador from "../database/Coordenador.js";

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { id_login, unidade } = req.body;
    const criar_coordenador = await Coordenador.create({
      id_login,
      unidade,
    });
    res.status(201).json({ message: "Coordenador criada com sucesso!", data: criar_coordenador });
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar Coordenador.", error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const rowsCoordenador = await Coordenador.findAll({
      raw: true,
      order: [["id_coordenador", "DESC"]],
    });
    if (rowsCoordenador.length === 0) {
      return res.status(404).json({ message: "Nenhum Registro de Coordenador encontrado!" });
    }
    res.status(200).json({ message: "Coordenador obtidas com sucesso!", data: rowsCoordenador });
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter Coordenador.", error: error.message });
  }
});


router.get('/:id_coordenador', async (req, res) => {
  try {
    const coordenador = await Coordenador.findByPk(req.params.id_coordenador);
    if (!coordenador) {
      return res.status(404).json({ message: "Coordenador não encontrada." });
    }
    res.status(200).json({ message: "Coordenador obtida com sucesso!", data: coordenador });
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter Coordenador.", error: error.message });
  }
});


router.put('/:id_coordenador', async (req, res) => {
  const { id_login, unidade } = req.body;
  try {
    const [updated] = await Coordenador.update(
      { id_login, unidade },
      { where: { id_coordenador: req.params.id_coordenador }, returning: true, runValidators: true }
    );
    if (updated === 0) {
      return res.status(404).json({ message: "Coordenador não encontrada." });
    }
    const updatedCoordenador = await Coordenador.findByPk(req.params.id_coordenador);
    res.status(200).json({
      message: "Coordenador atualizada com sucesso!",
      data: updatedCoordenador,
    });
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar coordenador.", error: error.message });
  }
});


router.delete('/:id_coordenador', async (req, res) => {
  try {
    const coordenadorDelet = await Coordenador.destroy({
      where: { id_coordenador: req.params.id_coordenador },
    });
    if (coordenadorDelet === 0) {
      return res.status(404).json({ message: "Coordenador não encontrada." });
    }
    res.status(200).json({ message: "Coordenador deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar Coordenador.", error: error.message });
  }
});

export default router;
