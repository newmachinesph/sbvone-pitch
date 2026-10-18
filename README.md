# SBV.one

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61dafb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-3ecf8e)

Website and pitch deck for Starting Block Ventures (SBV.one), a venture builder. It includes pages for ventures, the accelerator, the FutureCare Innovator Fellowship, a contact form, an in-browser pitch deck (Spectacle), and password-gated admin views for form submissions stored in Supabase.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Configuration

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_API_KEY=   # optional, defaults to the anon key
NEXT_PUBLIC_ADMIN_PASSWORD=     # optional gate for /admin
```

Note: `NEXT_PUBLIC_*` values are bundled into the client, so the admin gate is a convenience only. Rely on Supabase Row Level Security for real access control.

## Structure

- `app/` - Next.js App Router pages (home, about-us, ventures, accelerator, futurecare, contact, pitch, admin, intake forms)
- `components/` - shared header, footer and admin gate
- `lib/supabaseClient.ts` - Supabase clients
- `public/` - logos and images

## License

MIT, see [LICENSE](LICENSE).
