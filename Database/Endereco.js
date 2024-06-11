const{DataTypes, Sequelize } = require("sequelize");
const connection = require("./Database");

const Endereco = connection.define(
    "endereco",
    {
        id_endereco: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        rua_Endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bairro_Endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade_Endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado_Endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pais_Endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cep_Endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    {
        timestamps: true,
        tableName: "endereco"
    }
);
 async function syncendereco() {
     try {
         await Endereco.sync({ force: false});
     } catch (error) {
         console.error("Erro na sincronização de endereço", error);
     } 
     
 }

 module.exports = Endereco;

 /*module.exports = {
     Endereco: Endereco,
     syncendereco: syncendereco
 };*/