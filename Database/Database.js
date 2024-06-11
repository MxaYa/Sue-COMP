const Sequelize = require("sequelize")

const connection = new Sequelize("SUE", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = connection;