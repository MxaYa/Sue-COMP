import { DataTypes, Model } from 'sequelize';
import sequelize from './database.js';

class DisciplinaCursoVW extends Model { }

DisciplinaCursoVW.init(
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
    nome_disciplina: {
      type: DataTypes.STRING,
      allowNull: false,
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
    nome_curso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Presenca: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'disciplinaCursoVW',
    tableName: 'vw_disciplina_curso',
    timestamps: false,
  }
);

export async function sincronizarDisciplinaCursoVW() {
  try {
    await DisciplinaCursoVW.sync({ force: false });
  } catch (error) {
    console.error('Erro ao sincronizar a tabela: ', error);
  } finally {
    await sequelize.close();
    console.log('Conexão fechada.');
  }
}

export default DisciplinaCursoVW;
