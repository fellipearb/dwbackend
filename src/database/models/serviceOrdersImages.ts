const serviceOrdersImagesModel = (sequelize, { INTEGER, DATE, TEXT }) => {
  return sequelize.define('service_orders_images', {
    id: {
      type: INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    service_orders_id: {
      type: INTEGER(10),
      allowNull: false,
    },
    path: {
      type: TEXT,
    },
    createdAt: {
      type: DATE,
    },
    updatedAt: {
      type: DATE,
    },
  });
};

export default serviceOrdersImagesModel;
