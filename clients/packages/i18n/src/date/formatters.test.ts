import {
  formatDate,
  formatLocalizedLong,
  formatLocalizedShort,
} from './formatters';

test.each`
  date                                | expected        | format
  ${new Date('2022-01-20')}           | ${'2022-01-20'} | ${'yyyy-MM-dd'}
  ${new Date('2022-01-20').getTime()} | ${'2022-01-20'} | ${'yyyy-MM-dd'}
  ${'2022-01-20'}                     | ${'20/01/2022'} | ${'dd/MM/yyyy'}
`(
  'formatDate returns $format as $expected when given $date',
  ({ date, expected, format }) => {
    expect(formatDate(date, format)).toEqual(expected);
  }
);

test.each`
  date                      | expected
  ${new Date('2022-01-20')} | ${'January 20th, 2022 at 12:00:00 AM'}
`(
  'formatLocalizedLong returns $expected when given $date',
  ({ expected, date }) => {
    expect(formatLocalizedLong(date)).toEqual(expected);
  }
);

test.each`
  date                      | expected
  ${new Date('2022-01-20')} | ${'January 20th, 2022'}
`(
  'formatLocalizedShort returns $expected when given $date',
  ({ expected, date }) => {
    expect(formatLocalizedShort(date)).toEqual(expected);
  }
);
