import { DataTypes, Model } from 'sequelize';
import sequelize from './database.js'; 

class Ass_aluno_turma extends Model { }

Ass_aluno_turma.init(
  {
    id_aluno_turma: {
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
  },
  {
    sequelize,
    modelName: 'ass_aluno_turma',
    tableName: 'ass_aluno_turma',
    timestamps: true,
  }
);

export async function syncAss_aluno_turma() {
  try {
    await Ass_aluno_turma.sync({ force: false });
  } catch (error) {
    console.error('Erro na sincronização de aluno turma: ', error);
  }
}

export default Ass_aluno_turma;
