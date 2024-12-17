import { colors as brandColors } from '@apollo/brand';
import { colors, typography, fontFamily } from '@apollo/tailwind-preset';
import mapValues from 'lodash/mapValues';
import type { Config } from 'tailwindcss';
import defaultConfig from 'tailwindcss/defaultConfig';
import defaultTheme from 'tailwindcss/defaultTheme';

import { customColorsRaw } from './src/theme/customColors';
import { themeDefinitionsPlugin } from './tailwind.config/themeDefinitionsPlugin';

function customColorPalette<Key extends keyof typeof customColorsRaw>(
  key: Key,
) {
  return mapValues(
    customColorsRaw[key],
    (value) => `rgba(${value} / <alpha-value>)`,
  ) as (typeof customColorsRaw)[Key];
}

type StringValueKeys<Obj extends Record<string, unknown>> = keyof {
  [Key in keyof Obj]: Obj[Key] extends string ? Obj[Key] : never;
};

function generatePrimitivePalette(): Record<
  StringValueKeys<typeof brandColors.primitives>,
  string
> {
  const palette: Record<string, string> = { current: 'currentColor' };
  Object.entries(brandColors.primitives).forEach(([name, paletteOrColor]) => {
    if (typeof paletteOrColor === 'string') {
      palette[name] = paletteOrColor;
      return;
    }
    Object.entries(paletteOrColor).forEach(([color, shade]) => {
      palette[color === 'base' ? name : `${name}-${color}`] = shade;
    });
  });

  return palette;
}

const primitiveColors = generatePrimitivePalette();

const brandPalette = customColorPalette('brand');
const customTheme: Config['theme'] & { colors: typeof primitiveColors } = {
  colors: primitiveColors,
  extend: {
    backgroundColor: {
      ...customColorPalette('bg'),
      border: customColorPalette('border'),
      btn: customColorPalette('btn'),
      icon: customColorPalette('icon'),
      brand: { primary: brandPalette.primary, tertiary: brandPalette.tertiary },
      black: primitiveColors.black,
    },
    borderColor: {
      DEFAULT: brandPalette.primary,
      ...customColorPalette('border'),
      brand: { primary: brandPalette.primary, tertiary: brandPalette.tertiary },
    },
    textColor: {
      ...customColorPalette('text'),
      icon: customColorPalette('icon'),
      code: customColorPalette('code'),
      brand: { primary: brandPalette.primary, tertiary: brandPalette.tertiary },
      white: primitiveColors.white,
      black: primitiveColors.black,
    },
    boxShadow: {
      soft: '0 4px 8px 0 rgba(0, 0, 0, .04)',
      '2xl':
        '0 16px 32px 0 rgba(18, 21, 26, 0.12), 0 0 0 1px rgba(18, 21, 26, 0.04)',
    },
    fill: {
      icon: customColorPalette('icon'),
    },
    stroke: {
      bg: customColorPalette('bg'),
      border: customColorPalette('border'),
      icon: customColorPalette('icon'),
    },
    flex: {
      2: '2 2 0%',
      3: '3 3 0%',
      4: '4 4 0%',
      5: '5 5 0%',
      6: '6 6 0%',
      7: '7 7 0%',
      8: '8 8 0%',
      9: '9 9 0%',
    },
    fontFamily: {
      mono: 'var(--font-mono)',
      heading: 'var(--font-heading)',
      body: 'var(--font-body)',
    },
    minWidth: ({ theme: t }) => t('width'),
    maxWidth: ({ theme: t }) => t('width'),
    minHeight: ({ theme: t }) => t('height'),
    maxHeight: ({ theme: t }) => t('height'),
    rotate: {
      270: '270deg',
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1800px',
      // => @media (min-width: 1800px) { ... }
      '4xl': '1920px',
      // => @media (min-width: 1920px) { ... }
    },
  },
};

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [defaultConfig, colors, typography, fontFamily.openSource],
  plugins: [themeDefinitionsPlugin],
  darkMode: ['class', '.theme-container-dark'],
  theme: {
    ...defaultTheme,
    extend: {
      ...customTheme.extend,
      colors: {
        ...customTheme.colors,
      },
    },
  },
} satisfies Config;

export type Theme = 'light' | 'dark';
