const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

const Notas = connection.define(
    "notas",
    {
        id_notas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        aluno_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "aluno",
                key: "id_aluno",
            },
        },
        turma_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "turma",
                key: "id_turma",
            },
        },
        descricao_da_nota: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        valor_nota: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        data_da_nota: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: "notas"
    }
);

async function syncNotas() {
    try {
        await Notas.sync({ force: false });
    } catch (error) {
        console.error("Erro na sync de Notas", error);
    }
}

module.exports = Notas;

/*module.exports = {
    Notas: Notas,
    syncNotas: syncNotas
};*/