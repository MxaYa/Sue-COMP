const{DataTypes, Model } = require("sequelize");
const sequelize = require("./Database");

class Ass_aluno_turma extends Model {} 

Ass_aluno_turma.init(    
    {
        id_aluno_turma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        modelName: "Ass_Aluno_turma",
        tableName: "ass_Aluno_turma",
        timestamps: true,
    }
);

 async function syncAss_Aluno_turma() {
     try {
         await Ass_aluno_turma.sync({ force: true});
     } catch (error) {
         console.error("Erro na sincronização de aluno turma: ", error);
     } finally {
         await connection.close();
         console.log("Conexão fechada.");
     }
 }

Ass_aluno_turma.sync({ force: false }).then(() => {});
module.exports = Ass_aluno_turma;