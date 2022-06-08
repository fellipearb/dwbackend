import * as sequelize from 'sequelize';
import * as dotenv from 'dotenv';

import companiesModel from './models/companies';
import usersModel from './models/users';
import serviceOrdersModel from './models/serviceOrders';
import clientsModel from './models/clients';
import statusModel from './models/status';
import serviceOrdersImagesModel from './models/serviceOrdersImages';

dotenv.config();

const { Sequelize } = sequelize;

const db = <any>{};

const sequelizeConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
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
  },
);

const models = [
  companiesModel,
  usersModel,
  clientsModel,
  statusModel,
  serviceOrdersModel,
  serviceOrdersImagesModel,
];

models.forEach(model => {
  const seqModel = model(sequelizeConnection, sequelize);
  db[seqModel.name] = seqModel;
});

db.users.associate = models => {
  db.users.belongsTo(models.companies, {
    foreignKey: 'company_id',
    as: 'company',
  });
};

db.service_orders.associate = models => {
  db.service_orders.belongsTo(models.clients, {
    foreignKey: 'client_id',
    as: 'client',
  });

  db.service_orders.hasMany(models.service_orders_images, {
    foreignKey: 'service_orders_id',
    as: 'images',
  });

  db.service_orders.belongsTo(models.status, {
    foreignKey: 'status_id',
    as: 'status',
  });
};

Object.keys(db).forEach(key => {
  if ('associate' in db[key]) {
    db[key].associate(db);
  }
});

db.sequelize = sequelizeConnection;
db.Sequelize = Sequelize;

export default db;
