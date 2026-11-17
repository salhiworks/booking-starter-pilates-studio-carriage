import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Services, prices, lengths, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 *
 * Headings may wrap words in *asterisks*: those words are set heavy — the
 * "loaded spring" of the type (Emphasis).
 *
 * Copy rules (CLAUDE.md): Pilates here is movement practice — no medical or
 * rehabilitation claims, no promised results ("fix your back", "flat stomach",
 * "pain-free"), no invented credentials, reviews or awards.
 */
const SAMPLE_HELP =
  'A “Sample photo” label stays on it until you replace it with your own photo — use only photos of your own studio and clients (with their permission) or photos you have the right to use. Never show before/after pictures or another studio’s work as yours.';

type Img = { src: string; alt: string; width: number; height: number };
const P = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1000 });
const T = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1200 });
const L = (name: string, alt: string): Img => ({ src: `/photos/${name}-960.webp`, alt, width: 960, height: 640 });
const EMPHASIS = 'Wrap a word or two in *asterisks* to set them heavy — the loaded spring in the type.';
const SESSION_PHOTO = `Upright (4:5), shown beside the session when it is chosen. One person and one piece of equipment reads best; keep them near the middle. ${SAMPLE_HELP}`;

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo and the colour of the main buttons.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The name in the header and, set along the rail, in the footer. One to three short words read best.',
          default: 'Long Room',
          maxLength: 24,
          required: true,
        },
        {
          type: 'text',
          id: 'brand.descriptor',
          label: 'Line beside the name mark',
          help: 'What you are, in two or three words. Shown small beside the name.',
          default: 'Private Pilates',
          maxLength: 28,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide logo on a transparent background — the header sits on ultramarine at the top of the page and on chalk white below it, so a single-colour logo that reads on both works best. It replaces the name mark in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Accent colour',
          help: 'The main buttons, selected choices and the heavy words on light pages. Buttons carry white text, so pick a deep colour — ultramarine (the original), ink, forest, oxblood, plum. Light colours are refused because white text would not read on them.',
          default: '#2330c4',
          contrastWith: '#ffffff',
          minContrast: 4.5,
        },
      ],
    },
    {
      id: 'hero',
      label: 'First screen',
      description: 'The headline, a short introduction and the main photograph, on the ultramarine band at the top.',
      fields: [
        { type: 'text', id: 'hero.kicker', label: 'What you are', default: 'Private Pilates studio', maxLength: 40 },
        { type: 'text', id: 'hero.place', label: 'Where you are', help: 'A neighbourhood and city.', default: 'Sam Hughes, Tucson', maxLength: 40 },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: `Short — it is set very large. Say how it feels to practise here, not a promise about results. ${EMPHASIS}`,
          default: 'Every movement, *on purpose.*',
          maxLength: 40,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'One-to-one Pilates on the reformer and the mat, in one long, quiet room. One instructor, one client at a time — every spring set for you, every movement cued.',
          maxLength: 200,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Main button', default: 'Book a session', maxLength: 28, required: true },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo (upright)',
          help: `Upright (4:5), shown tall beside the headline and gliding in along the rail. One person and the equipment, with space around them, reads best. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/hero-reach-960.webp',
            alt: 'A woman in pale blue kneeling sideways on a wooden reformer, one hand on the footbar and the other arm curved over her head, in a white room with arched mirrors.',
            width: 960,
            height: 1200,
          },
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'private',
      label: 'One to one',
      description: 'Why a private session: three short points beside a photograph.',
      fields: [
        { type: 'text', id: 'private.title', label: 'Heading', help: EMPHASIS, default: 'Nobody else *in the room.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'private.intro',
          label: 'Introduction',
          default:
            'There are no classes here and no second reformer waiting. The whole session — and the whole room — is set around you: your pace, your springs, your questions.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'list',
          id: 'private.points',
          label: 'Three points',
          help: 'Up to three: a short title and a sentence or two each.',
          itemLabel: 'Point',
          maxItems: 3,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 28, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 200, rows: 3 },
          ],
          default: [
            { title: 'One instructor', text: 'The same person every time, who remembers what you worked on last week and what you want next.' },
            { title: 'One client', text: 'Every cue is for you. Ask why, ask again, slow down — nobody is keeping pace with a class.' },
            { title: 'One plan', text: 'Each session follows on from the last. No set routine to keep up with; we build yours.' },
          ],
        },
        {
          type: 'image',
          id: 'private.photo',
          label: 'Photo (tall)',
          help: `Tall (2:3). An instructor guiding a client reads best. ${SAMPLE_HELP}`,
          default: T('private-guide', 'An instructor leaning over a reformer, guiding a client who lies on the carriage with her feet in the straps.'),
          aspectRatio: 2 / 3,
        },
      ],
    },
    {
      id: 'sessions',
      label: 'Sessions',
      description:
        'The words and photographs around your sessions. The sessions themselves — names, descriptions, lengths and prices — are edited in Services. A description can end with “Good for: a steady weekly practice”, shown as its own line. The photo beside each session is chosen from its name: introduction, reformer, mat, mobility or technique.',
      fields: [
        { type: 'text', id: 'sessions.title', label: 'Heading', help: EMPHASIS, default: 'Choose your *session.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'sessions.intro',
          label: 'Introduction',
          default: 'Every session is private and in the studio. Lengths are the real time with your instructor; prices are paid at the studio, never online.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'list',
          id: 'sessions.paths',
          label: 'Where to start',
          help: 'Up to five answers to “Where are you starting from?”. Each points to the first session whose name contains the words you give (for example “Introduct” or “Mat”); an answer whose words match no session is hidden.',
          itemLabel: 'Answer',
          maxItems: 5,
          fields: [
            { type: 'text', id: 'label', label: 'Answer', default: '', maxLength: 40, required: true },
            { type: 'text', id: 'match', label: 'Words in the session’s name', default: '', maxLength: 30, required: true },
          ],
          default: [
            { label: 'I’m new to Pilates', match: 'Introduct' },
            { label: 'I want a weekly practice', match: 'Reformer' },
            { label: 'I’d like to practise at home', match: 'Mat' },
            { label: 'I’m coming back after time off', match: 'Mobility' },
            { label: 'I want to work on one thing', match: 'Technique' },
          ],
        },
        { type: 'image', id: 'sessions.photoIntro', label: 'Photo — introduction', help: SESSION_PHOTO, default: P('session-intro', 'A woman in pale blue sitting on a wooden reformer, one leg folded, both hands on the frame, looking calmly ahead.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'sessions.photoReformer', label: 'Photo — reformer', help: SESSION_PHOTO, default: P('session-reformer', 'A woman with one foot on a reformer’s carriage and both hands on the footbar, the tower’s wooden frame behind her.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'sessions.photoMat', label: 'Photo — mat', help: SESSION_PHOTO, default: P('session-mat', 'A woman in black sitting on a mat in an empty white room, knees bent, leaning back on her hands.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'sessions.photoMobility', label: 'Photo — mobility', help: SESSION_PHOTO, default: P('session-mobility', 'A woman balancing on a mat in window light, both legs lifted and held straight by the feet.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'sessions.photoTechnique', label: 'Photo — technique', help: SESSION_PHOTO, default: P('session-technique', 'A woman lying on a reformer with her feet in the straps, holding handles attached to the tower.'), aspectRatio: 4 / 5 },
        {
          type: 'text',
          id: 'sessions.footnote',
          label: 'Small print under the sessions',
          default: 'One session per booking. Want two in a week? Book them one at a time — there are no packages or memberships to buy.',
          maxLength: 200,
        },
      ],
    },
    {
      id: 'apparatus',
      label: 'The equipment',
      description: 'The reformer and the tower, explained: numbered parts beside a photograph.',
      fields: [
        { type: 'text', id: 'apparatus.title', label: 'Heading', help: EMPHASIS, default: 'Light springs. *Hard work.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'apparatus.intro',
          label: 'Introduction',
          default:
            'The reformer looks like a machine and works like a conversation. Springs push back as you move; the less of them there is, the more control the movement asks of you.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'list',
          id: 'apparatus.parts',
          label: 'Parts',
          help: 'Up to four. The numbers sit on the original photograph; with your own photo they are shown as a numbered list.',
          itemLabel: 'Part',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'name', label: 'Name', default: '', maxLength: 24, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 180, rows: 3 },
          ],
          default: [
            { name: 'Springs', text: 'Set heavier or lighter for every movement. Heavier supports you; lighter asks for more control.' },
            { name: 'Straps', text: 'For hands or feet. They take the work away from the floor and give your legs and arms something to press against.' },
            { name: 'Carriage', text: 'The padded platform that glides along the frame. You move it out against the springs — and bring it home slowly.' },
            { name: 'Box', text: 'Sits on the carriage for sitting and lying work, and makes room for movements the floor can’t.' },
          ],
        },
        {
          type: 'image',
          id: 'apparatus.photo',
          label: 'Photo (tall)',
          help: `Tall (2:3). The equipment on its own, square on. ${SAMPLE_HELP}`,
          default: T('apparatus', 'A wooden reformer with a tower frame seen from its end: hanging springs and a black strap above, the padded carriage, and a black box in front.'),
          aspectRatio: 2 / 3,
        },
      ],
    },
    {
      id: 'first',
      label: 'First session',
      description: 'What happens on a first visit, in four steps — practical, never medical.',
      fields: [
        { type: 'text', id: 'first.title', label: 'Heading', help: EMPHASIS, default: 'Your first *session.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'first.intro',
          label: 'Introduction',
          default: 'No experience needed, and nothing to buy first. Here is the hour, start to finish.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'list',
          id: 'first.steps',
          label: 'Steps',
          help: 'Up to four: a short title and a few practical sentences.',
          itemLabel: 'Step',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 24, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 240, rows: 3 },
          ],
          default: [
            { title: 'Arrive', text: 'Come five minutes early in clothes you can move in. Bare feet or grip socks; water and a towel are here.' },
            { title: 'Talk', text: 'How you move day to day, what you enjoy, what you’d like from Pilates. Say as much or as little as you like.' },
            { title: 'Move', text: 'Breathing first, then the reformer on lighter springs and a few mat essentials. Stop or change anything at any point.' },
            { title: 'Plan', text: 'We agree what comes next and how often makes sense for you. You book one session at a time — no package to buy.' },
          ],
        },
        {
          type: 'image',
          id: 'first.photo',
          label: 'Photo (tall)',
          help: `Tall (2:3). A calm, light-filled space reads best. ${SAMPLE_HELP}`,
          default: T('room-light', 'A woman sitting on a mat in an empty white room, stripes of sunlight falling across the wall and floor.'),
          aspectRatio: 2 / 3,
        },
        {
          type: 'longText',
          id: 'first.note',
          label: 'Small print',
          default:
            'Pilates here is exercise, not a medical treatment. If you are pregnant, recovering from an injury or an operation, or under a doctor’s care, please check with your doctor first and tell us before your session.',
          maxLength: 280,
          rows: 3,
        },
      ],
    },
    {
      id: 'room',
      label: 'The room',
      description: 'Four photographs of the studio and the work, each with a short caption.',
      fields: [
        { type: 'text', id: 'room.title', label: 'Heading', help: EMPHASIS, default: 'One long room. *Light all day.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'room.intro',
          label: 'Introduction',
          default: 'A reformer, a tower, a mat and a wall of windows. Nothing else competes for the space.',
          maxLength: 200,
          rows: 2,
        },
        { type: 'image', id: 'room.photo1', label: 'Photo 1 (tall)', help: `Tall (2:3). ${SAMPLE_HELP}`, default: T('room-tower', 'A woman hanging upside down from the bars of a Pilates tower, legs hooked over the top, arms reaching down.'), aspectRatio: 2 / 3 },
        { type: 'text', id: 'room.caption1', label: 'Caption 1', default: 'The tower', maxLength: 40 },
        { type: 'image', id: 'room.photo2', label: 'Photo 2 (wide)', help: `Wide (3:2). ${SAMPLE_HELP}`, default: L('room-straps', 'A woman lying on a reformer, feet in the black straps and knees bent, the room’s white walls behind.'), aspectRatio: 3 / 2 },
        { type: 'text', id: 'room.caption2', label: 'Caption 2', default: 'Straps on the reformer', maxLength: 40 },
        { type: 'image', id: 'room.photo3', label: 'Photo 3 (upright)', help: `Upright (4:5). ${SAMPLE_HELP}`, default: P('room-plank', 'A woman in black holding a side plank on one hand, the other arm reaching straight up, in a white studio.'), aspectRatio: 4 / 5 },
        { type: 'text', id: 'room.caption3', label: 'Caption 3', default: 'Mat work', maxLength: 40 },
      ],
    },
    {
      id: 'faq',
      label: 'Questions & policies',
      description: 'Practical answers before a first session. Until you edit them they are labelled “Sample policies”.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Heading', help: EMPHASIS, default: 'Good *questions.*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 10,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 90, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'I’ve never done Pilates. Where do I start?',
              answer: 'With the introductory session. It assumes nothing: we start with breathing and how the reformer works, and go at your pace. Many people book a regular session straight after.',
            },
            {
              question: 'Reformer or mat — what’s the difference?',
              answer:
                'The same principles, different tools. The reformer’s springs can support you or challenge you; the mat uses your own body weight and a few small props. Most people do both over time, and we’ll suggest a mix.',
            },
            {
              question: 'What should I wear?',
              answer: 'Fitted clothes you can move in, so your instructor can see your alignment. Bare feet or grip socks. There is a place to change and to leave your things.',
            },
            {
              question: 'I’m pregnant, injured or seeing a doctor. Can I come?',
              answer:
                'Please check with your doctor first, and tell us before your session — don’t put medical details in the booking form. Pilates here is exercise, not therapy, and we won’t give medical advice.',
            },
            {
              question: 'How often should I come?',
              answer: 'Whatever fits your week. Once a week is a good rhythm for many people; some come twice. You book each session on its own — there are no packages or memberships.',
            },
            {
              question: 'What if I need to cancel?',
              answer: 'Please let us know at least 24 hours before so someone else can have the time. Arriving more than ten minutes late may mean a shorter session.',
            },
            {
              question: 'How do I pay?',
              answer: 'At the studio, after your session, by card or cash. Nothing is paid online, and there are no deposits.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The closing booking band and the top of the booking sheet.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Heading', help: EMPHASIS, default: 'Your time *on the reformer.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose a session and a time. Every request is read and confirmed by your instructor, usually within a day.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'image',
          id: 'book.photo',
          label: 'Photo (upright)',
          help: `Upright (4:5), shown in the closing booking band. Remove it for text only. ${SAMPLE_HELP}`,
          default: P('book-ready', 'A woman kneeling on a reformer’s carriage, pulling two straps from the tower towards her.'),
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Hours, address, phone and email come from your Business settings. Add how to find you.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Heading', help: EMPHASIS, default: 'Find the *long room.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Finding us',
          default:
            'Studio B is the last door along the courtyard, past the bakery on East 6th. Free parking behind the building, a bike rack by the gate, and the streetcar stops two blocks away.',
          maxLength: 400,
          rows: 3,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [{ type: 'text', id: 'footer.tagline', label: 'Line under the name', default: 'Private Pilates · reformer and mat · Tucson', maxLength: 80 }],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Long Room — private Pilates in Tucson',
          maxLength: 80,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'A private Pilates studio in Tucson: one-to-one reformer, mat, mobility and technique sessions with one instructor, one client at a time. Book online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
  ],
});
