/**
 * This website's identity — the ONE place for its name, time zone and the
 * placeholder contact details shown in preview mode (`npm run dev` without
 * Supabase). Everything the owner manages (services, prices, hours, real
 * contact details, text and photos) lives in the dashboard at /admin/.
 */
export const SITE = {
  /** The business name. The dashboard's Business page overrides it once connected. */
  name: 'Long Room Pilates',
  /** IANA time zone of the business (Arizona keeps standard time all year). */
  timezone: 'America/Phoenix',
  /** Fictional contact details for preview mode only. */
  previewContact: {
    email: 'hello@longroom.example',
    phone: '+1 520-555-0163',
    address: '2412 E 6th St, Studio B, Tucson, AZ 85719',
  },
};
