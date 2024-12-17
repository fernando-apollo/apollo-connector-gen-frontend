import path from 'path';

import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import commonjs from 'vite-plugin-commonjs';
import monacoEditorPluginModule from 'vite-plugin-monaco-editor';
import svgr from 'vite-plugin-svgr';

// Monaco editor plugin's module is stored in the `default` property
// so to handle this safely we should check if it exists and get it as such
// See https://github.com/vdesjs/vite-plugin-monaco-editor/issues/21#issuecomment-1827562674 for more info
const isObjectWithDefaultFunction = (
  module: unknown
): module is { default: typeof monacoEditorPluginModule } =>
  module != null &&
  typeof module === 'object' &&
  'default' in module &&
  typeof module.default === 'function';

const monacoEditorPlugin = isObjectWithDefaultFunction(monacoEditorPluginModule)
  ? monacoEditorPluginModule.default
  : monacoEditorPluginModule;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    commonjs(),
    svgr(),
    react(),
    optimizeLodashImports(),
    monacoEditorPlugin({
      languageWorkers: ['json', 'editorWorkerService'],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': '/src',
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        // allow reading from the 'crates' directory
        '../../crates/wasm-bridge/pkg',
      ],
    },
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true }, // Change
  },
});
