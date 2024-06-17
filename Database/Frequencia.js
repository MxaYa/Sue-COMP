const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

const Frequencia = connection.define(
    "Frequencia",
    {
        id_frequencia: {
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
        Data_Frequencia: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Presenca: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: "frequencia"
    }
);

async function syncFrenquencia() {
    try {
        await Frequencia.sync({ force: false });
    } catch (error) {
        console.error("Erro na sync de Frenquencia", error);
    }
}

module.exports = Frequencia;

/*module.exports ={
    Frequencia: Frequencia,
    syncFrenquencia: syncFrenquencia
};*/