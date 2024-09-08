import { DataTypes } from 'sequelize';
import sequelize from './database.js'; // Arquivo de configuração da conexão com o banco de dados

const Professor = sequelize.define('Professor', {
  id_professor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  area_de_ensino: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_login: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuario',
      key: 'id_usuario',
    },
  },
}, {
  timestamps: true,
  tableName: 'professor',
});

export async function syncProfessor() {
  try {
    await Professor.sync({ force: false });
  } catch (error) {
    console.error('Erro na sincronização de Professor', error);
  }
}

export default Professor;
