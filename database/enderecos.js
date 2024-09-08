import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Endereco = sequelize.define('Endereco', {
  id_endereco: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Endereco;
