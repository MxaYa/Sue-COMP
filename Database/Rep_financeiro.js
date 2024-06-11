const{DataTypes, Sequelize } = require("sequelize");
const connection = require("./Database");

const Rep_financeiro = connection.define(
    "Rep_financeiro",
    {
        id_rep_financeiro: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        login_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Usuario",
                key: "id_usuario",
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
    },
    {
        timestamps: true,
        tableName: "Rep_financeiro"
    }
);
 async function syncRep_financeiro() {
     try {
         await Rep_financeiro.sync({ force: false});
     } catch (error) {
         console.error("Erro na sinc")
     }
 }

 module.exports = Rep_financeiro;

 /*module.exports = {
     Rep_financeiro: Rep_financeiro,
     syncRep_financeiro: syncRep_financeiro
 };*/