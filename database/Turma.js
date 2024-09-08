import { DataTypes } from 'sequelize';
import sequelize from './database.js'; // Arquivo de configuração da conexão com o banco de dados

const Turma = sequelize.define('Turma', {
  id_turma: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  id_curso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'curso',
      key: 'id_curso',
    },
  },
  id_disciplina: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'disciplina',
      key: 'id_disciplina',
    },
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'turma',
});

export async function syncTurma() {
  try {
    await Turma.sync({ force: false });
  } catch (error) {
    console.error('Erro na sincronização de Turma', error);
  }
}

export default Turma;
