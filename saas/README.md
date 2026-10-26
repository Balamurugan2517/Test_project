# ReviewFlow SaaS - Review Aggregator MVP

A simple review management SaaS for local service businesses. Collect Google, Yelp, and Facebook reviews in one dashboard, reply from anywhere, and embed reviews on your website.

## Project Structure

```
saas/
├── index.html          # Landing page (marketing site)
├── dashboard.html      # Business owner dashboard (review management)
├── styles.css          # Custom CSS (yellow theme)
├── script.js           # Frontend logic for dashboard
├── package.json        # Project metadata
└── README.md           # This file
```

## Features

### Landing Page (`index.html`)
- Value proposition: "Stop chasing reviews. Start growing your business."
- Feature grid: All reviews in one place, reply from anywhere, website widget
- 3-step how it works
- Pricing tiers: Starter ($29/mo), Growth ($69/mo), Enterprise (custom)
- CTA to start free trial

### Dashboard (`dashboard.html`)
- Sidebar navigation (Dashboard, Reviews, Widget Code, Settings)
- Stats cards: Total reviews, average rating, replies sent, new this week
- Review list with star ratings, platform badges, and reply status
- Reply modal to respond to reviews
- Mock data included for demo purposes

## Colors

Primary brand color: **Yellow** (`#eab308`) - chosen for high visibility and trust.

## How to Run

### Option 1: Open Locally
Simply open `index.html` in your web browser. No build step required.

### Option 2: Deploy to Vercel
1. Push this folder to GitHub
2. Connect the repo to Vercel
3. Deploy - it's a static site, no build configuration needed

## Next Steps to Make It Production-Ready

1. **Backend**: Add Node.js/Python backend with database (PostgreSQL/Supabase)
2. **Authentication**: Add login/signup (NextAuth.js or Supabase Auth)
3. **API Integration**: Connect to Google Business, Yelp, and Facebook APIs
4. **Real Reviews**: Replace mock data with API-fetched reviews
5. **Email Notifications**: Send alerts when new reviews arrive
6. **Widget**: Generate embed code snippet for customer websites

## Tech Stack (MVP)

- HTML5 + Tailwind CSS (CDN)
- Vanilla JavaScript
- No build step - deployable to any static host

## Monetization

- Starter: $29/month (1 location, Google + Facebook)
- Growth: $69/month (3 locations, all platforms + widget)
- Enterprise: Custom (unlimited locations + dedicated support)
