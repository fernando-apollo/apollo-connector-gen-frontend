import numeral from 'numeral';

function formatNumber(n: number | string | null | undefined, fmt = '0') {
  const isNumber = (num: number | string | null | undefined) =>
    (typeof num === 'number' || typeof num === 'string') &&
    !isNaN(Number(num)) &&
    isFinite(Number(num));
  return isNumber(n) ? numeral(n).format(fmt) : '-';
}

export const format = {
  number: formatNumber,
  pluralize(
    number: number | undefined,
    rootString: string,
    pluralization = 's',
  ) {
    return number === 1 ? rootString : `${rootString}${pluralization}`;
  },
};
