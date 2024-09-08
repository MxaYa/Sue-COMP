import { DataTypes, Model } from 'sequelize';
import sequelize from './database.js'; // Arquivo de configuração da conexão com o banco de dados

class Coordenador extends Model { }

Coordenador.init(
  {
    id_coordenador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_login: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id_usuario',
      },
    },
    unidade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'coordenador',
    tableName: 'coordenador',
    timestamps: true,
  }
);

export async function syncCoordenador() {
  try {
    await Coordenador.sync({ force: false });
  } catch (error) {
    console.error('Erro na sincronização de coordenador', error);
  }
}

export default Coordenador;
