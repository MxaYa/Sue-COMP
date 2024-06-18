// Importando a biblioteca sequelize
//const Sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

//Criando uma instância do Sequelize
// Esta instância é uma conexão com o banco MYSQL

/* const connection = new Sequelize(
  "railway",
  "root",
  "mysql://root:VWIPTzOKLuBcPaxkhVZJDonTTHswBPKQ@monorail.proxy.rlwy.net:48887/railway",
  {
    host: "monorail.proxy.rlwy.net",
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
);
 */

const connection = new Sequelize(
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
);

//module.exports = sequelize;

module.exports = connection;
/* let producao = true;
if (producao === true) {
  const connection = new Sequelize(
    "sue",
    "root",
    "mysql://root:VWIPTzOKLuBcPaxkhVZJDonTTHswBPKQ@monorail.proxy.rlwy.net:48887/railway",
    {
      host: "monorail.proxy.rlwy.net",
      dialect: "mysql",
    }
  );
} else {
  const connection = new Sequelize("sue", "root", "8067Ghtb@", {
    host: "localhost",
    dialect: "mysql",
  });
} */

