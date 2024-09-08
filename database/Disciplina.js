
import { DataTypes } from 'sequelize';
import connection from './database.js';

const Disciplina = connection.define(
  "disciplina",
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
    timestamps: true,
    tableName: "disciplina",
  }
);


export default Disciplina;