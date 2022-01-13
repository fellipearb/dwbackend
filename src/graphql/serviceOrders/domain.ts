import { formatReal } from '../../utils/money';

export const buildOrderService = order => {
  const { images } = order;

  if (images) {
    images.forEach(image => {
      image.path = `${process.env.STORAGE_URL}/${image.path}`;
    });
  }

  const content = {
    value: formatReal(order.value),
  };

  order.content = content;

  return order;
};

export const buildOrderServices = orders => {
  orders.map(client => {
    return buildOrderService(client);
  });

  return orders;
};
