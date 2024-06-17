const { DataTypes } = require('sequelize');
const connection = require('./database');

const Professor = connection.define('Professor', {
    id_professor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    login_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    area_de_ensino: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'professor', 
    timestamps: true
});

module.exports = Professor;
