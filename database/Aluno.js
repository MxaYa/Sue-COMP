import { DataTypes, Model } from 'sequelize';
import sequelize from './database.js';

class Aluno extends Model {}

Aluno.init(
  {
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(255), // Definindo o comprimento máximo para STRING
      allowNull: false,
    },
    id_login: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',  // Certifique-se de que este é o nome correto da tabela
        key: 'id_usuario',
      },
    },
    rep_financeiro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rep_financeiro',  // Certifique-se de que este é o nome correto da tabela
        key: 'id_rep_financeiro',
      },
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    pagamento_curso: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Aluno',
    tableName: 'aluno',
    timestamps: true,
  }
);

export async function syncAluno() {
  try {
    await Aluno.sync({ alter: true }); // Usar alter em vez de force para manter dados existentes
    console.log('Tabela aluno sincronizada com sucesso.');
  } catch (error) {
    console.error('Erro na sincronização da tabela aluno:', error);
  }
}

export default Aluno;
