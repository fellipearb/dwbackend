import { formatReal } from '../../utils/money';

export const buildOrderService = order => {
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
