const { Sequelize } = require("sequelize");

const connection = new Sequelize("SUE", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306, // ou a porta do seu servidor MySQL
});

module.exports = connection;




/*const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Adicione esta linha para especificar a porta
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 60000, // Aumenta o tempo de timeout para 60 segundos
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);*/

//