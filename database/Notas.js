import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Notas = sequelize.define('Notas', {
  id_notas: {
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
  descricao_da_nota: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  valor_nota: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  data_da_nota: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'notas',
});

export async function syncNotas() {
  try {
    await Notas.sync({ force: false });
  } catch (error) {
    console.error('Erro na sincronização de Notas', error);
  }
}

export default Notas;
