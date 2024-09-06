const { DataTypes } = require("sequelize");

const connection = require("./database");

const usuario = connection.define(
    "usuarios",
    {
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_endereco: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "endereco",
                key: "id_endereco",
            },
        },
    },
    {
        timestamps: true,
        tablename: "usuarios",
    }
);

async function syncUsuario() {
    try {
        await usuario.sync({ force: false });
    } catch (error) {
        console.error("Erro Usuario.", error);
    }
}

module.exports = usuario;

/*module.exports =  {
    usuario: usuario,
    syncUsuario: syncUsuario
}*/