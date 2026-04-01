export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB').format(date);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  }).format(amount);
};
