const{DataTypes, Model } = require("sequelize");
const sequelize = require("./Database");


class Ass_aluno_turmaVW extends Model {} 

Ass_aluno_turmaVW.init(    
    {
        id_aluno_turma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nome_aluno: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        aluno_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Aluno",
                key: "id_aluno",
              },
        },
        turma_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Turma",
                key: "id_turma",
              },
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Status_aprovacao",
                key: "id_status",
              },
        },

    },
    {   
        sequelize,
        modelName: "Ass_Aluno_turmaVW",
        tableName: "vwass_Aluno_turma",
        timestamps: false,
    }
);

 async function syncAss_Aluno_turma() {
     try {
         await Ass_aluno_turmaVW.sync({ force: true});
     } catch (error) {
         console.error("Erro na sincronização de aluno turma: ", error);
     } finally {
         await connection.close();
         console.log("Conexão fechada.");
     }
 }

Ass_aluno_turmaVW.sync({ force: false }).then(() => {});
module.exports = Ass_aluno_turmaVW;