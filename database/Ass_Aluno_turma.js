const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database");

class Ass_aluno_turma extends Model { }

Ass_aluno_turma.init(
    {
        id_aluno_turma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        id_aluno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "aluno",
                key: "id_aluno",
            },
        },
        id_turma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "turma",
                key: "id_turma",
            },
        },

    },
    {
        sequelize,
        modelName: "ass_Aluno_turma",
        tableName: "ass_Aluno_turma",
        timestamps: true,
    }
);

async function syncAss_Aluno_turma() {
    try {
        await Ass_aluno_turma.sync({ force: true });
    } catch (error) {
        console.error("Erro na sincronização de aluno turma: ", error);
    } finally {
        await connection.close();
        console.log("Conexão fechada.");
    }
}

Ass_aluno_turma.sync({ force: false }).then(() => { });
module.exports = Ass_aluno_turma;