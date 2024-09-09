const Coordenador = require('../database/Coordenador.js');

// CREATE - Adiciona um novo coordenador
exports.createCoordenador = async (req, res) => {
  try {
    const { nome_coordenador, email_coordenador, telefone_coordenador } = req.body;
    const novoCoordenador = await Coordenador.create({
      nome_coordenador,
      email_coordenador,
      telefone_coordenador
    });
    res.status(201).json({
      message: "Coordenador criado com sucesso!",
      data: novoCoordenador
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar coordenador.",
      error: error.message
    });
  }
};

// READ - Obtém todos os coordenadores
exports.getAllCoordenadores = async (req, res) => {
  try {
    const coordenadores = await Coordenador.findAll();
    res.status(200).json({
      message: "Coordenadores obtidos com sucesso!",
      data: coordenadores
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao obter coordenadores.",
      error: error.message
    });
  }
};

// READ - Obtém um coordenador pelo ID
exports.getCoordenadorById = async (req, res) => {
  try {
    const coordenador = await Coordenador.findByPk(req.params.id);
    if (!coordenador) {
      return res.status(404).json({ message: "Coordenador não encontrado." });
    }
    res.status(200).json({
      message: "Coordenador obtido com sucesso!",
      data: coordenador
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao obter coordenador.",
      error: error.message
    });
  }
};

// UPDATE - Atualiza um coordenador pelo ID
exports.updateCoordenador = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_coordenador, email_coordenador, telefone_coordenador } = req.body;
    const coordenador = await Coordenador.findByPk(id);
    if (!coordenador) {
      return res.status(404).json({ message: "Coordenador não encontrado." });
    }
    coordenador.nome_coordenador = nome_coordenador || coordenador.nome_coordenador;
    coordenador.email_coordenador = email_coordenador || coordenador.email_coordenador;
    coordenador.telefone_coordenador = telefone_coordenador || coordenador.telefone_coordenador;
    await coordenador.save();
    res.status(200).json({
      message: "Coordenador atualizado com sucesso!",
      data: coordenador
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar coordenador.",
      error: error.message
    });
  }
};

// DELETE - Remove um coordenador pelo ID
exports.deleteCoordenador = async (req, res) => {
  try {
    const { id } = req.params;
    const coordenador = await Coordenador.findByPk(id);
    if (!coordenador) {
      return res.status(404).json({ message: "Coordenador não encontrado." });
    }
    await coordenador.destroy();
    res.status(200).json({ message: "Coordenador removido com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao remover coordenador.",
      error: error.message
    });
  }
};
