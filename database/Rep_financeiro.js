import { DataTypes } from 'sequelize';
import sequelize from './database.js'; // Arquivo de configuração da conexão com o banco de dados

const Rep_financeiro = sequelize.define('Rep_financeiro', {
  id_rep_financeiro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  id_login: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuario',
      key: 'id_usuario',
    },
  },
  data_transacao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'rep_financeiro',
});

export async function syncRep_financeiro() {
  try {
    await Rep_financeiro.sync({ force: false });
  } catch (error) {
    console.error('Erro na sincronização de Rep_financeiro', error);
  }
}

export default Rep_financeiro;
