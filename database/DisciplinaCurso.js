import { DataTypes, Model } from 'sequelize';
import sequelize from './database.js';

class DisciplinaCurso extends Model { }

DisciplinaCurso.init(
  {
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'disciplina',
        key: 'id_disciplina',
      },
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'curso',
        key: 'id_curso',
      },
    },
  },
  {
    sequelize,
    modelName: 'disciplinaCurso',
    tableName: 'disciplina_curso',
    timestamps: true,
  }
);

export async function sincronizarDisciplinaCurso() {
  try {
    await DisciplinaCurso.sync({ force: true });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela: ', error);
  } finally {
    await sequelize.close();
    console.log('Conexão fechada.');
  }
}

export default DisciplinaCurso;
