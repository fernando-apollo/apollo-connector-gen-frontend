import { expect, test } from 'vitest';

import { autoGenerateMapping } from './autoGenerate.ts';

test('makes aliases', () => {
  expect(
    autoGenerateMapping(
      JSON.stringify({
        valid1: {
          number_two: {
            '@number-three*': 3,
          },
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    "valid1 {
      numberTwo: number_two {
        numberThree: '@number-three*'
      }
    }"
  `);
});
