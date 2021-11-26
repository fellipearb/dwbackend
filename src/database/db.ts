import * as sequelize from "sequelize";
import usersModel from "./models/users";

const { Sequelize } = sequelize;

const db = <any>{};

const sequelizeConnection = new Sequelize("dwinfotec", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorsAliases: null,
});

const models = [usersModel];

// Initialize models
models.forEach((model) => {
  const seqModel = model(sequelizeConnection, sequelize);
  db[seqModel.name] = seqModel;
});

// Apply associations
Object.keys(db).forEach((key) => {
  if ("associate" in db[key]) {
    db[key].associate(db);
  }
});

db.sequelize = sequelizeConnection;
db.Sequelize = Sequelize;

export default db;
