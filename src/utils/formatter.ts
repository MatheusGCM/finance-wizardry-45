export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

export const formatCurrency = (value: number): string => {
  return currencyFormatter.format(value);
};

export const dateFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("pt-BR");
};
