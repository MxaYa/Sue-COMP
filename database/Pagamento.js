import { DataTypes } from 'sequelize';
import sequelize from './database.js'; // Arquivo de configuração da conexão com o banco de dados

const Pagamento = sequelize.define('Pagamento', {
  id_pagamento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  rep_financeiro_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'rep_financeiro',
      key: 'id_rep_financeiro',
    },
  },
  valor_pago: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  data_pago: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tipo_desconto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numero_parcela: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'pagamento',
});

export async function syncPagamento() {
  try {
    await Pagamento.sync({ force: false });
  } catch (error) {
    console.error('Erro na sincronização de Pagamento', error);
  }
}

export default Pagamento;
