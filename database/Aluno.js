import { DataTypes, Model } from 'sequelize';
import sequelize from './database.js'; // Arquivo de configuração da conexão com o banco de dados

class Aluno extends Model { }

Aluno.init(
  {
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_login: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id_usuario',
      },
    },
    id_rep_financeiro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rep_financeiro',
        key: 'id_rep_financeiro',
      },
    },
    ativo: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    pagamento_curso: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'aluno',
    tableName: 'aluno',
    timestamps: true,
  }
);

export async function syncAluno() {
  try {
    await Aluno.sync({ force: false });
  } catch (error) {
    console.error('Erro na sincronização de aluno', error);
  }
}

export default Aluno;
