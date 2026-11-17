import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'pilates-studio-carriage',
  preset: sitePreset,
  business: {
    name: 'Long Room Pilates',
    timezone: 'America/Phoenix',
    email: 'hello@longroom.example',
    phone: '+1 520-555-0163',
    address: '2412 E 6th St, Studio B, Tucson, AZ 85719',
  },
  ownerEmail: 'owner@longroom.example',
  referencePrefix: 'LR',
  sampleNotes: [
    'Done a few reformer classes at a gym, never one-to-one.',
    'Would like to work on the footwork we started last week.',
    'Back after a few months off — happy to take it slowly.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Inés Valdez', email: 'ines.valdez@example.com', phone: '+1 520 555 0112' },
    { name: 'Morgan Tate', email: 'morgan.tate@example.com', phone: '+1 520 555 0126' },
    { name: 'Asha Patel', email: 'asha.patel@example.com', phone: '+1 520 555 0133' },
    { name: 'Rebecca Holm', email: 'rebecca.holm@example.com', phone: '+1 520 555 0148' },
    { name: 'Daniel Ortiz', email: 'daniel.ortiz@example.com', phone: '+1 520 555 0150' },
    { name: 'Grace Nakamura', email: 'grace.nakamura@example.com', phone: '+1 520 555 0161' },
    { name: 'Lena Fischer', email: 'lena.fischer@example.com', phone: '+1 520 555 0174' },
    { name: 'Tomás Rivera', email: 'tomas.rivera@example.com', phone: '+1 520 555 0187' },
    { name: 'Claire Dubois', email: 'claire.dubois@example.com', phone: '+1 520 555 0195' },
    { name: 'Sam Whitaker', email: 'sam.whitaker@example.com', phone: '+1 520 555 0109' },
  ],
};
