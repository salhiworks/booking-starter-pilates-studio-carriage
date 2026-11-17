import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Darker Grotesque (variable weight 300–900): every heading, figure and the name mark — tall and
// narrow, set light, with the emphasised words loaded heavy. Rethink Sans (variable): reading text.
import '@fontsource-variable/darker-grotesque';
import '@fontsource-variable/rethink-sans';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import './styles/booking.css';
import { App } from './App';
import { engine } from './lib/engine';
import type { DemoEngine } from './demo/engine';

if (__BOOKING_DEMO__) void import('./demo/engine/DemoBar').then((m) => m.mountDemoBar(engine as DemoEngine, 'site'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
