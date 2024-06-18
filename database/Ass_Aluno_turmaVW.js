const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database");


class Ass_aluno_turmaVW extends Model { }

Ass_aluno_turmaVW.init(
    {
        id_aluno_turma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        modelName: "ass_Aluno_turmaVW",
        tableName: "vwass_Aluno_turma",
        timestamps: false,
    }
);

async function syncAss_Aluno_turma() {
    try {
        await Ass_aluno_turmaVW.sync({ force: false });
    } catch (error) {
        console.error("Erro na sincronização de aluno turma: ", error);
    } finally {
        await connection.close();
        console.log("Conexão fechada.");
    }
}

Ass_aluno_turmaVW.sync({ force: false }).then(() => { });
module.exports = Ass_aluno_turmaVW;