import { expect, test } from 'vitest';
import { formatDate } from './date';

test.each`
  date                      | expected
  ${'2022-01-02'}           | ${'2022-01-02'}
  ${new Date('2022-01-02')} | ${'2022-01-02'}
  ${''}                     | ${undefined}
  ${null}                   | ${undefined}
  ${undefined}              | ${undefined}
`('formatDate given $date returns $expected', ({ date, expected }) => {
  expect(formatDate(date)).toEqual(expected);
});
