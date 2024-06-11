const{DataTypes, Sequelize } = require("sequelize");
const connection = require("./Database");

const Pagamento = connection.define(
    "pagamento",
    {
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
                model: "Rep_financeiro",
                key: "id_rep_financeiro",
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

    },
    {
        timestamps: true,
        tableName: "pagamento"
    }
);

async function syncPagamento() {
    try {
        await Pagamento.sync({ force: false });
    } catch (error) {
        console.error("Erro na sync Pagamento", error);
    } 
}

module.exports = Pagamento;

/*module.exports = {
    Pagamento: Pagamento,
    syncPagamento: syncPagamento,
};*/