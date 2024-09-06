const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

const Turma = connection.define(
    "turma",
    {
        id_turma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            references: {
                model: "turma",
                key: "id_turma",
            },
        },
        id_curso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "curso",
                key: "id_curso",
            },
        },
        id_disciplina: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "disciplina",
                key: "id_disciplina",
            },
        },
        /*professor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },*/
        horario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: "turma"
    }
);
async function syncTurma() {
    try {
        await Turma.sync({ force: false });
    } catch (error) {
        console.error("Erro sync Turma", error);
    }
}

module.exports = Turma;
/*module.exports = {
    Turma: Turma,
    syncTurma: syncTurma
};*/
