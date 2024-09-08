import { DataTypes, Model } from 'sequelize';
import sequelize from './database.js';

class Ass_aluno_turmaVW extends Model { }

Ass_aluno_turmaVW.init(
  {
    id_aluno_turma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.TEXT,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: 'ass_aluno_turmaVW',
    tableName: 'vw_ass_aluno_turma',
    timestamps: false,
  }
);

export async function syncAss_aluno_turmaVW() {
  try {
    await Ass_aluno_turmaVW.sync({ force: false });
  } catch (error) {
    console.error('Erro na sincronização de aluno turma: ', error);
  }
}

export default Ass_aluno_turmaVW;
