import { DataTypes } from 'sequelize';
import connection from './database.js';

const Curso = connection.define(
  'curso',
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
        model: 'coordenador',
        key: 'id_coordenador',
      },
    },
  },
  {
    timestamps: true,
    tableName: 'curso',
  }
);


export default Curso;
