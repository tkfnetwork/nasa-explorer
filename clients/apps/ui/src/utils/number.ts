export const Units = {
  kilometers: 'kilometers',
  miles: 'miles',
  feet: 'feet',
} as const;
export type Units = (typeof Units)[keyof typeof Units];

const unitMap: Record<string, string | undefined> = {
  feet: 'foot',
  miles: 'mile',
  kilometers: 'kilometer',
  'kilometers-per-hour': 'kilometer-per-hour',
  'miles-per-hour': 'mile-per-hour',
  // There is no fph
  'feet-per-hour': undefined,
};

export const formatByUnit =
  (unit: string, locale?: string) =>
  (number: string | number = ''): string => {
    const unitType = unitMap?.[unit as Units];

    const result =
      unitType && !!number
        ? new Intl.NumberFormat(locale, {
            style: 'unit',
            unit: unitType,
            unitDisplay: 'narrow',
          }).format(typeof number === 'string' ? parseFloat(number) : number)
        : String(number);

    return result;
  };
