const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database"); // Arquivo de configuração da conexão com o banco de dados

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Curso = connection.define(
  "curso",
  {
    id_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_curso: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    id_coordenador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "coordenador",
        key: "id_coordenador",
      },
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "curso", // Nome da tabela no banco de dados
  }
);

async function sincronizarCurso() {
  try {
    await Curso.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Curso.sync({ force: false }).then(() => {});

module.exports = Curso;
//module.exports = sincronizarCurso();

/* module.exports = {
    Curso: Curso,
    sincronizarCurso: sincronizarCurso
  }; */
