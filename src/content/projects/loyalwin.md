---
title: LoyalWin
category: Loyalty · Mobile Web
tagline: A loyalty program platform with points, tiers, vouchers and QR transactions across customer and admin apps.
year: "2025"
startDate: "2025-12"
endDate: "2026-04"
role: Web Developer
teamSize: 10
stack: ["React", "Vue 3", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "React Query", "Zustand", "Vuetify", "Pinia", "ApexCharts", "TipTap", "NestJS", "TypeORM", "PostgreSQL", "JWT / Passport", "Socket.io", "MinIO", "Docker", "Resend"]
featured: true
tint: "255,0,110"
order: 5
highlights:
  - QR-based points & voucher redemption with real-time updates
  - Auto tier upgrade/downgrade scheduler plus expiration cron jobs
  - CASL RBAC admin panel with analytics dashboards
responsibilities:
  - area: Frontend — Customer App
    items:
      - Built the customer-facing app in React, Vite, TypeScript and Tailwind — Loyalty Points, Vouchers, Transaction History, Profile, Notifications, Referral and OAuth Login/Register.
      - Integrated QR code (scan & generate) and Socket.io real-time notifications, with Zustand state, React Hook Form + Zod validation, i18n and a responsive multi-device layout.
  - area: Frontend — Admin Panel
    items:
      - Developed the Vue 3 / Vuetify (Vuexy) admin dashboard — analytics, store/voucher/customer/staff management, content (articles, sliders, FAQ, terms), RBAC, system configuration and feedback.
      - Integrated ApexCharts for data visualization and a TipTap rich-text editor for content management.
  - area: Backend — API
    items:
      - Built the NestJS / TypeORM / PostgreSQL API with JWT + OAuth (Google, Facebook, Apple) authentication.
      - Implemented loyalty business logic — earn/redeem points, membership tiers, point conversion, vouchers and multi-level referral — across Customer, Staff, Store, Transaction, Voucher, Content, Notification and Analytics modules.
      - Added WebSocket notifications, an auto upgrade/downgrade tier scheduler, cron jobs for voucher/point expiration, MinIO/S3 upload and Docker Compose deployment.
links:
  live: "https://app.clickup.com/9018436962/v/f/901813282563/90182683331"
  code: "https://github.com/tenomad-company/loyalty-frontend"
---

LoyalWin is a loyalty-program platform spanning a React customer app, a Vue 3 admin panel and a NestJS API. It covers points, membership tiers, vouchers, referrals and QR transactions, with schedulers driving automatic tier changes and expiration.
