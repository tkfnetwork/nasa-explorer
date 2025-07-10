import { expect, test } from 'vitest';
import { formatByUnit } from './number';

test.each`
  unit                     | number   | expected
  ${'feet'}                | ${100}   | ${'100′'}
  ${'miles'}               | ${100}   | ${'100mi'}
  ${'kilometers'}          | ${100}   | ${'100km'}
  ${'kilometers-per-hour'} | ${100}   | ${'100km/h'}
  ${'miles-per-hour'}      | ${100}   | ${'100mph'}
  ${'feet-per-hour'}       | ${100}   | ${'100'}
  ${'feet'}                | ${'100'} | ${'100′'}
  ${'miles'}               | ${'100'} | ${'100mi'}
  ${'kilometers'}          | ${'100'} | ${'100km'}
  ${'kilometers-per-hour'} | ${'100'} | ${'100km/h'}
  ${'miles-per-hour'}      | ${'100'} | ${'100mph'}
  ${'feet-per-hour'}       | ${'100'} | ${'100'}
`(
  'formatUnit $unit when given $number retruns $expected',
  ({ unit, number, expected }) => {
    const formatter = formatByUnit(unit);

    expect(formatter(number)).toEqual(expected);
  }
);
