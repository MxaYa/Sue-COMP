const Disciplina = require("../database/Disciplina");

// CREATE - Cria uma nova Disciplina
exports.createDisciplina = async (req, res) => {
  const { nome_disciplina, valor_disciplina, descricao_disciplina } = req.body;
  try {
    const disciplina = await Disciplina.create({
      nome_disciplina,
      valor_disciplina,
      descricao_disciplina,
    });
    res
      .status(201)
      .json({ message: "Disciplina criada com sucesso!", data: disciplina });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao criar Disciplina.", error: error.message });
  }
};

// READ - Obtém todas as Disciplinas
exports.getAllDisciplina = async (req, res) => {
  try {
    const disciplinas = await Disciplina.findAll({
      raw: true,
      order: [["id_disciplina", "DESC"]],
    }); // Obtém todas as Disciplinas do banco de dados
    res
      .status(200)
      .json({ message: "Disciplinas obtidas com sucesso!", data: disciplinas });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter Disciplinas.", error: error.message });
  }
};

// READ - Obtém uma Disciplina pelo ID
exports.getDisciplinaById = async (req, res) => {
  try {
    const disciplina = await Disciplina.findByPk(req.params.id_disciplina); // Obtém a Disciplina pelo ID fornecido nos parâmetros da URL
    if (!disciplina) {
      return res.status(404).json({ message: "Disciplina não encontrada." });
    }
    res
      .status(200)
      .json({ message: "Disciplina obtida com sucesso!", data: disciplina });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter Disciplina.", error: error.message });
  }
};

// UPDATE - Atualiza uma disciplina pelo ID
exports.updateDisciplinaById = async (req, res) => {
  const { nome_disciplina, valor_disciplina, descricao_disciplina } = req.body;
  const { id_disciplina } = req.params;
  try {
    const [rowsUpdated, [updatedDisciplina]] = await Disciplina.update(
      { nome_disciplina, valor_disciplina, descricao_disciplina },
      { where: { id_disciplina }, returning: true, runValidators: true }
    );
    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "Disciplina não encontrada." });
    }
    res.status(200).json({
      message: "Disciplina atualizada com sucesso!",
      data: updatedDisciplina,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar disciplina.", error: error.message });
  }
};

// DELETE - Deleta uma Disciplina pelo ID
exports.deleteDisciplina = async (req, res) => {
  const { id_disciplina } = req.params;
  try {
    const rowsDeleted = await Disciplina.destroy({
      where: { id_disciplina },
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Disciplina não encontrada." });
    }
    res.status(200).json({ message: "Disciplina deletada com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar Disciplina.", error: error.message });
  }
};
