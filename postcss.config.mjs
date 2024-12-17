import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssReporter from 'postcss-reporter';
import tailwind from 'tailwindcss';

export default {
  plugins: [
    tailwind(),
    autoprefixer(),
    postcssReporter({
      filter: (message) => ['warning', 'purgecss'].includes(message.type),
    }),
    process.env.NODE_ENV === 'production' ? cssnano() : false,
  ].filter(Boolean),
};
