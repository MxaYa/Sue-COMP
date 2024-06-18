const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

const Professor = connection.define(
    "professor",
    {
        id_professor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        area_de_ensino: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        login_id: {
            type: DataTypes.INTEGER,
            allowNull: false,


            references: {
                model: "usuario",
                key: "id_usuario",
            },
        },
    },
    {
        timestamps: true,
        tableName: "professor"
    }
);

async function syncProfessor() {
    try {
        await Professor.sync({ force: false });
    } catch (error) {
        console.error("Erro na sync Professor", error);
    }
}

module.exports = Professor;

