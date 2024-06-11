const{DataTypes, Sequelize } = require("sequelize");
const connection = require("./Database");

const Turma = connection.define(
    "turma",
    {
        id_turma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            references: {
                model: "Turma",
                key: "id_turma",
              },
        },
        curso_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Curso",
                key: "id_curso",
              },
        },
        disciplina_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Disciplina",
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
