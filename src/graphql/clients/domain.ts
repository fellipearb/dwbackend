import { maskPhone } from '../../utils/phone';

export const buildClient = client => {
  const content = {
    tel: maskPhone(client.tel),
  };

  client.content = content;

  return client;
};

export const buildClients = clients => {
  clients.map(client => {
    return buildClient(client);
  });

  return clients;
};
