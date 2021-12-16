import VMasker from 'vanilla-masker';

export const formatReal = (value: number | string) => {
  return VMasker.toMoney(value ?? 0, {
    precision: 2,
    separator: ',',
    delimiter: '.',
    unit: 'R$',
    zeroCents: false,
  });
};
