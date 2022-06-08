const companiesModel = (sequelize, { INTEGER, STRING, DATE }) => {
  return sequelize.define('companies', {
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
    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
  });
};

export default companiesModel;
