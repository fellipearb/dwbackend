const clientsModel = (sequelize, { INTEGER, STRING, DATE, TEXT }) => {
  return sequelize.define('clients', {
    id: {
      type: INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: STRING(200),
      allowNull: false,
    },
    email: {
      type: STRING(200),
      allowNull: false,
    },
    tel: {
      type: STRING(11),
    },
    cpf: {
      type: STRING(11),
    },
    street: {
      type: STRING(200),
    },
    district: {
      type: STRING(200),
    },
    city: {
      type: STRING(200),
    },
    state: {
      type: STRING(200),
    },
    complement: {
      type: TEXT,
    },
    notes: {
      type: TEXT,
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

export default clientsModel;
