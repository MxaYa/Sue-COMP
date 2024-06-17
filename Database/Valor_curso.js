const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

const Valor_curso = connection.define(
    "valor_curso",
    {
        id_valor_curso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        curso_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "curso",
                key: "id_curso",
            },
        },
        valor: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        turno: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: "valor_curso"
    }
);
async function syncValor_curso() {
    try {
        await Valor_curso.sync({ force: false });
    } catch (error) {
        console.error("Erro sync Valor Curso", error);
    }
}

module.exports = Valor_curso;

/*module.exports = {
    Valor_curso: Valor_curso,
    syncValor_curso: syncValor_curso
};*/