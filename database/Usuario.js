import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_endereco: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'endereco',
      key: 'id_endereco',
    },
  },
}, {
  timestamps: true,
  tableName: 'usuario',
});

export async function syncUsuario() {
  try {
    await Usuario.sync({ force: false });
  } catch (error) {
    console.error('Erro na sincronização de Usuario', error);
  }
}

export default Usuario;
