import VMasker from 'vanilla-masker';

export const maskPhone = (text: string | number): string => {
  let phone = `${text}`;

  if (typeof text === 'string' && text.indexOf('+55') !== -1) {
    phone = text.substring(3);
  }

  if (phone.length > 11) {
    phone = phone.replace(/^.{0,2}/, '');
  }

  return VMasker.toPattern(phone, '(99) 9 9999-9999');
};
