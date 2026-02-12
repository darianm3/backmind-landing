# Backmind Landing Page

A Next.js landing page for Backmind with Supabase waitlist integration.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Supabase**
   
   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Create the waitlist table in Supabase**
   
   Run this SQL in your Supabase SQL Editor:
   ```sql
   create table waitlist (
     id uuid default gen_random_uuid() primary key,
     email text unique not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Enable Row Level Security
   alter table waitlist enable row level security;

   -- Allow anonymous inserts (for the waitlist form)
   create policy "Allow anonymous inserts" on waitlist
     for insert with check (true);

   -- Allow anonymous select to check for existing emails
   create policy "Allow anonymous select" on waitlist
     for select using (true);
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Project Structure

```
backmind-landing/
├── app/
│   ├── globals.css    # All styles
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Landing page
├── lib/
│   └── supabase.ts    # Supabase client
├── .env.local.example # Environment template
└── package.json
```

## Future Expansion

This project is set up to grow into a full web app:

- Add `/app/login/page.tsx` for authentication
- Add `/app/dashboard/page.tsx` for logged-in users
- Add Supabase Auth for user management
