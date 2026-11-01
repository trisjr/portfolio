---
title: LoyalWin
category: Loyalty · Mobile Web
tagline: A multi-tenant restaurant loyalty platform — customer app, staff POS and admin panel — with points, tiers, vouchers and referrals.
year: "2026"
startDate: "2026-02"
endDate: "2026-09"
role: Full-stack Developer
teamSize: 7
stack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "TanStack Query", "Zustand", "React Router", "Recharts", "Vue 3", "Vuetify (Vuexy)", "Pinia", "ApexCharts", "CASL", "NestJS 11", "TypeORM", "PostgreSQL", "Passport (JWT + OAuth)", "Socket.IO", "MinIO", "Resend", "Docker Compose", "Nginx"]
featured: true
tint: "255,0,110"
order: 8
highlights:
  - Staff POS with QR point slider, per-transaction points cap and receipt photo capture
  - Two-level referral rewards with invite links, cookie expiry and QR sharing
  - Daily discount reports, CSV export and store-contribution analytics end to end
responsibilities:
  - area: Frontend — Customer App
    items:
      - Built the referral flow (invite links from referral codes, cookie handling, QR share modal), profile, edit profile and change password, the contact-us form and the filtered transaction history.
      - Applied German number formatting app-wide and added chunk-load error recovery, scroll restoration and cache/PIN-session clearing on logout.
  - area: Frontend — Staff POS
    items:
      - Built the staff QR point slider with a dynamic points-conversion rate, PIN bill entry, insufficient-points warnings and a per-transaction redemption cap.
      - Added daily discount report printing and receipt-photo capture at checkout via the device camera.
  - area: Frontend — Admin Panel
    items:
      - Built feedback management, CSV transaction export, store-report dashboards and remember-me sessions.
      - Added points-cap, brand-contact and store configuration forms and receipt-photo preview on transactions.
  - area: Backend — API
    items:
      - Implemented the two-level referral reward system, point-history tracking with date-range filters and the feedback API with rate limiting.
      - Added CSV transaction export, daily discount report and store-contribution analytics endpoints, and fixed points calculation and Berlin-timezone reporting.
      - Built private transaction receipt photos (MinIO, manager-gated review, 365-day retention), the per-transaction points cap, 7-day remember-me tokens and OTP resend.
links:
  live: "#"
  code: "https://github.com/tenomad-company/loyalty-frontend"
---

LoyalWin is a multi-tenant loyalty platform for restaurant brands, spanning a React customer app and staff POS, a Vue 3 admin panel and a NestJS API, with points, membership tiers, vouchers, referrals and QR transactions. I worked full-stack across all three apps, building referral rewards, the staff POS checkout flow with receipt photos and points caps, and transaction reporting and analytics.
