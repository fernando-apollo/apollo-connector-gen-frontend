import { ThemeProvider } from '@components/themeProvider/ThemeProvider.tsx';
import * as Tooltip from '@radix-ui/react-tooltip';
import EventEmitter from 'eventemitter3';
import { createRoot } from 'react-dom/client';
import * as WebFont from 'webfontloader';

import App from './App.tsx';

import './styles/tailwind.import.css';
import './index.css';
import './keyframes.css';
import 'allotment/dist/style.css';

// Since we are using a custom monaco font we should make sure it loads before anything else.
// Once it loads we should emit an event to force font loading in monaco if it hasn't already.
// This is important for windows users on chrome.
const eventEmitter = new EventEmitter();
WebFont.load({
  custom: {
    families: ['Fira Code'],
  },
  active: () => {
    eventEmitter.emit('webfontsLoaded');
  },
});

const rootNode = document.getElementById('root');
if (!rootNode) throw new Error('missing root dom node');
createRoot(rootNode).render(
  <ThemeProvider>
    <Tooltip.Provider delayDuration={0}>
      <App />
    </Tooltip.Provider>
  </ThemeProvider>
);
