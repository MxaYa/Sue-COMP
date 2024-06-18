
const { DataTypes } = require('sequelize');
const connection = require('./database');
const Endereco = require('./enderecos');

const Usuario = connection.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Endereco,
      key: 'id_endereco'
    },
    allowNull: false
  }
}, {
  tableName: 'usuario',
  timestamps: true
});

Usuario.belongsTo(Endereco, { foreignKey: 'endereco_id' });

module.exports = Usuario;
