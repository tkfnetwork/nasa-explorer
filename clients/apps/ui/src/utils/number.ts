export const formatByUnit =
  (unit: string, locale?: string) =>
  (number: string | number = ''): string =>
    new Intl.NumberFormat(locale, {
      style: 'unit',
      unit,
      unitDisplay: 'narrow',
    }).format(typeof number === 'string' ? parseFloat(number) : number);
