import clientsModel from './clients';

const serviceOrdersModel = (sequelize, { INTEGER, STRING, DATE, TEXT }) => {
  return sequelize.define('service_orders', {
    id: {
      type: INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    client_id: {
      type: INTEGER(10),
      allowNull: false,
    },
    equipment: {
      type: STRING(200),
    },
    brand: {
      type: STRING(200),
    },
    identification: {
      type: STRING(200),
    },
    reports: {
      type: TEXT,
    },
    description: {
      type: TEXT,
    },
    notes: {
      type: TEXT,
    },
    value: {
      type: STRING(200),
    },
    status_id: {
      type: INTEGER(10),
      allowNull: false,
    },
    createdAt: {
      type: DATE,
    },
    updatedAt: {
      type: DATE,
    },
    closedAt: {
      type: DATE,
    },
  });
};

export default serviceOrdersModel;
