# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code session opened in
this folder. It changes identity and words only, so it finishes in one short session.

```text
Customize this private Pilates studio starter for my business.

Studio name: <YOUR STUDIO NAME>
City and area: <CITY, AREA>
Time zone (IANA): <e.g. America/Denver>
How I teach and my personality in a few words: <e.g. classical reformer, precise and patient, lots of beginners>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the studio name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my studio: the name mark and the line
   beside it, what I am and where, the headline (short — it is set very large), introduction and
   main button, the one-to-one heading, introduction and three points, the sessions heading,
   introduction, "Where to start" answers and small print, the equipment heading, introduction and
   parts, the first-session heading, introduction, steps and small print, the room heading,
   introduction and captions, the questions & policies (my real policies), the booking heading and
   introduction, the finding-us note, the footer line and the search title and description. Keep
   field ids, types, limits and photos. Keep the sample photos (they stay labelled "Sample photo"
   until I upload my own).
   Keep the honesty rules: one booking is one private session with one client — no classes,
   capacities, packages, memberships or class passes; Pilates is exercise, not therapy — no medical,
   rehabilitation or result claims ("fixes back pain", "flat stomach", "injury recovery"); the booking
   form never asks about health, injuries, medication or pregnancy, and the site never suggests the
   booking system checks anyone's suitability; anything medical → "check with your doctor first and
   tell us before your session"; nothing is paid online; no session lengths or prices written into
   the copy; no invented clients, results, before/after photos, certifications, years of experience,
   awards, press, reviews or testimonials.
4. Only if ultramarine clearly doesn't fit my brand (otherwise skip this step): change the default
   of brand.accent in src/content/site.ts (a deep colour that keeps white text at 4.5:1 — ink,
   forest, oxblood, plum) and the light colour in src/admin-theme.css. The ultramarine, birch and
   night bands are part of the design and stay.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json.
Do not invent sessions, prices, opening hours or credentials I haven't told you about —
sessions, prices and hours are set in the dashboard. When done, run npm run build and fix any
error, then show me the result with npm run dev.
```

## After the prompt

- **Your sessions:** dashboard → Services. One booking is one private session with you, for one
  service, with one client.
  - **Kinds.** The page reads each session's kind from the words in its name (then its description):
    *introductory, introduction, first, taster, welcome* → **Introduction** (listed first, as "New
    here? Start with" in the booking sheet); *technique, tune-up, express* → **Technique**;
    *mobility, movement, stretch, gentle, restorative* → **Mobility**; *mat* → **Mat**; *reformer,
    tower, cadillac, chair, apparatus* → **Reformer**. The kind picks the session's photograph.
  - **Short names on the rail.** The rail sets each name large without the words every session
    shares — "Private Reformer Session" shows as "Reformer". The full name stays in the panel, the
    booking sheet and every email.
  - **Who it's for.** End a description with `Good for:` — `Good for: a steady weekly practice`. Describe
    the client's situation in their own words, never a condition or a result.
- **Where to start:** Website → Sessions → "Where to start". Each answer points to the first session
  whose name contains the words you give ("Introduct", "Mat"); an answer whose words match no
  session is hidden, so renaming a session never leaves a broken answer.
- **Session photos:** Website → Sessions — one upright photo each for introduction, reformer, mat,
  mobility and technique.
- **The equipment:** the numbered pins sit on the original photograph only; with your own photo, the
  parts read as a numbered list beside it.
- **Headings:** wrap a word or two in *asterisks* to set them heavy — in the first-screen headline
  they take their own line, in birch.
- **Photos:** Website → each section. Use only your own studio and clients (with their permission)
  or photos you have the right to use. The "Sample photo" label disappears from each one you replace.
- **Online booking:** dashboard → Settings, once email sending works (see BOOKING_ENGINE.md).
