// Module: Disciplina.js

// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Disciplina = connection.define( // começo da definição do objeto
  "disciplina", // primeiro parâmetro: nome do model
  {
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_disciplina: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao_disciplina: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "disciplina", // Nome da tabela no banco de dados
  }
);

async function syncDisciplina() {
  try {
    // Use `alter` para ajustar a tabela sem excluir dados existentes
    await Disciplina.sync({ alter: true });
    console.log("Tabela 'disciplina' sincronizada com sucesso!");
  } catch (error) {
    console.error("Erro ao sincronizar a tabela 'disciplina': ", error);
  }
}

// Exporta o modelo e a função de sincronização
module.exports = {
  Disciplina,
  syncDisciplina,
};
