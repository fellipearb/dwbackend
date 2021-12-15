export const fileImageToStore = image => {
  const rootPath = process.cwd();
  const base64Data = image.file.replace(/^data:image\/png;base64,/, '');
  const name = `${new Date().getTime()}.jpg`;
  const path = `${rootPath}/${process.env.STORAGE_PATH}/${process.env.STORAGE_PATH_SERVICE_ORDERS}/${name}`;
  const pathToSave = `${process.env.STORAGE_URL}/${process.env.STORAGE_PATH_SERVICE_ORDERS}/${name}`;

  return {
    base64Data,
    name,
    path,
    pathToSave,
  };
};

export const uploadImage = async (db, images, orderId) =>
  new Promise(resolve => {
    images?.map(async (image, index) => {
      const { base64Data, path, pathToSave } = fileImageToStore(image);

      try {
        await require('fs').writeFileSync(path, base64Data, 'base64');

        await db.default.service_orders_images.create({
          service_orders_id: orderId,
          path: pathToSave,
        });

        if (index + 1 === images.length) {
          resolve(true);
        }
      } catch (err) {
        console.error('err', err);
      }
    });
  });
