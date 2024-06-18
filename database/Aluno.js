const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

const Aluno = connection.define(
    "aluno",
    {
        id_aluno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        login_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Usuario",
                key: "id_usuario",
            },
        },
        rep_financeiro_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Rep_financeiro",
                key: "id_rep_financeiro",
            },
        },
        ativo: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        pagamento_curso: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: "aluno"
    }
);

async function syncAluno() {
    try {
        await Aluno.sync({ force: false });
    } catch (error) {
        console.error("Erro na sync aluno", error);
    }
}

module.exports = Aluno;

/*module.exports = {
    Aluno: Aluno,
    syncAluno: syncAluno
};*/