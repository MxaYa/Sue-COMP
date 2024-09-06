 const { DataTypes, Sequelize } = require("sequelize");
 const dataTypes = require("sqlize/lib/data-types");

 const connection = require("./database");

const Coordenador = connection.define(
    "coordenador",
      {
          id_coordenador: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
          },
          id_login: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: {
                  model: "usuario",
                  key: "id_usuario",
              },
          },
          unidade: {
              type: DataTypes.STRING,
              allowNull: true,
          },

      },
      {
          timestamps: true,
          tableName: "coordenador"
      }
  );
  async function syncCoordenador() {
      try {
          await Coordenador.sync({ force: false });
      } catch (error) {
          console.error("Erro na sincronização de coordenador", error);
      }
  }

  module.exports = Coordenador;