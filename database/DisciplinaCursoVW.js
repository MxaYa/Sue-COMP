const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); // Arquivo de configuração da conexão com o banco de dados

class DisciplinaCursoVW extends Model { }

DisciplinaCursoVW.init(
  {
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "disciplina",
        key: "id_disciplina",
      },
    },
    nome_disciplina: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "curso",
        key: "id_curso",
      },
    },
    nome_curso: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    Presenca: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "disciplinaCursoVW",
    tableName: "vw_disciplina_curso",
    timestamps: false,
  }
);

async function sincronizarDisciplinaCursoVW() {
  try {
    await DisciplinaCursoVW.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

DisciplinaCursoVW.sync({ force: false }).then(() => { });
module.exports = DisciplinaCursoVW;
