const Sequelize = require("sequelize")

const connection = new Sequelize("SUE", "root", "", {
    host: "192.168.56.1",
    dialect: "mysql",
});

module.exports = connection;