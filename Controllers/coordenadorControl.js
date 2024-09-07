const Coordenador = require("../database/Coordenador");

// CREATE - Cria uma nova Coordenador
exports.createCoordenador = async (req, res) => {
  try {
    const { id_login, unidade,} = req.body;
    const criar_coordenador = await Coordenador.create({
      id_login,
      unidade,
    });
    res
      .status(201)
      .json({ message: "Coordenador criada com sucesso!", data: criar_coordenador });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao criar Coordenador.", error: error.message });
  }
};

// READ - Obtém todas as Coordenadors
exports.getAllCoordenador = async (req, res) => {
  try {
    const rowsCoordenador = await Coordenador.findAll({
      raw: true,
      order: [["id_coordenador", "DESC"]],
    });
    res
      .status(404)
      .json({ message: "Nenhum Registro de Coordenador encontrado!", data: rowsCoordenador})

    res
      .status(200)
      .json({ message: "Coordenador obtidas com sucesso!", data: rowsCoordenador });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter Coordenador.", error: error.message });
  }
};

// READ - Obtém uma Coordenador pelo ID
exports.getCoordenadorById = async (req, res) => {
  try {
    const rowsCoordenador = await Coordenador.findByPk(req.params.id_coordenador); 
    if (rowsCoordenador === 0) {
      return res.status(404).json({ message: "coordenador não encontrada." });
    }
    res
      .status(200)
      .json({ message: "Coordenador obtida com sucesso!", data: rowsCoordenador });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter Coordenador.", error: error.message });
  }
};

// UPDATE - Atualiza um Coordenador pelo ID
exports.updateCoordenadorById = async (req, res) => {
  const { id_login, unidade } = req.body;
  try {
    const updateCoordenador = await Coordenador.update(
      { unidade },
      { where: { id_coordenador }, returning: true, runValidators: true }
    );
    if (updateCoordenador === 0) {
      return res.status(404).json({ message: "Coordenador não encontrada." });
    }
    res.status(200).json({
      message: "Coordenador atualizada com sucesso!",
      data: updateCoordenador,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar coordenador.", error: error.message });
  }
};

// DELETE - Deleta uma Coordenador pelo ID
exports.deleteCoordenador = async (req, res) => {
  const { id_coordenador} = req.params;
  try {
    const coordenadorDelet = await Coordenador.destroy({
      where: { id_coordenador },
    });
    if (coordenadorDelet === 0) {
      return res.status(404).json({ message: "Coordenador não encontrada." });
    }
    res.status(200).json({ message: "Coordenador deletada com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar Coordenador.", error: error.message });
  }
};
