const{DataTypes, Sequelize } = require("sequelize");
const connection = require("./Database");

const Ass_curso_disciplina = connection.define(
    "Ass_curso_disciplina",
    {
        curso_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        disciplina_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: "Ass_curso_disciplina"
    }
);

async function syncCurso_disciplina() {
    try {
        await Ass_curso_disciplina.sync({force: false});
    } catch (error) {
        console.error("Erro na sync Associação curso e disciplina", error);
    } finally {
        await connection.close();
        console.log("Conexão fechada Associativa curso e disciplina");
    }
}

module.exports = Ass_curso_disciplina;

/*module.exports = {
    Ass_curso_disciplina: Ass_curso_disciplina,
    syncCurso_disciplina: syncCurso_disciplina
};*/