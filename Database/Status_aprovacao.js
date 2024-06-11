const{DataTypes, Sequelize } = require("sequelize");
const connection = require("./Database");

const Status_aprovacao = connection.define(
    "status_aprovacao",
    {
        id_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: "status_aprovacao"
    }
);

async function syncStatus_aprovacao() {
    try {
        await Status_aprovacao.sync({force: false});
    } catch (error) {
        console.error("Erro na sync Status de aprovacao", error);
    }
}

module.exports = Status_aprovacao;

/*module.exports = {
    Status_aprovacao: Status_aprovacao,
    syncStatus_aprovacao: syncStatus_aprovacao
};*/