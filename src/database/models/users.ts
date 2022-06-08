const usersModel = (sequelize, { INTEGER, STRING, DATE }) => {
  return sequelize.define('users', {
    id: {
      type: INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    company_id: {
      type: STRING(200),
      allowNull: false,
    },
    name: {
      type: STRING(200),
      allowNull: false,
    },
    login: {
      type: STRING(200),
      allowNull: false,
    },
    password: {
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

export default usersModel;
