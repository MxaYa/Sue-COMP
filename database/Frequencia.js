import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Frequencia = sequelize.define('Frequencia', {
  id_frequencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  id_aluno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'aluno',
      key: 'id_aluno',
    },
  },
  id_turma: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'turma',
      key: 'id_turma',
    },
  },
  Data_Frequencia: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Presenca: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'frequencia',
});

export async function syncFrequencia() {
  try {
    await Frequencia.sync({ force: false });
  } catch (error) {
    console.error('Erro na sync de Frequencia', error);
  }
}

export default Frequencia;
