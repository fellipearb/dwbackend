import VMasker from 'vanilla-masker';

export const maskCPF = (text: string | number): string => {
  return VMasker.toPattern(text, '999.999.999-99');
};

export const masCEP = (text: string | number): string => {
  return VMasker.toPattern(text, '99999-999');
};
