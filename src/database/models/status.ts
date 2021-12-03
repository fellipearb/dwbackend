const statusModel = (sequelize, { INTEGER, STRING, DATE, TEXT }) => {
  return sequelize.define('status', {
    id: {
      type: INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: STRING(30),
      allowNull: false,
    },
    types: {
      type: STRING(30),
      allowNull: false,
    },
    createdAt: {
      type: DATE,
    },
    updatedAt: {
      type: DATE,
    },
  });
};

export default statusModel;
