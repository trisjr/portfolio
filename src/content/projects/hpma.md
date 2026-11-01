---
title: High Performance Marketing Ads
category: AdTech · FinOps
tagline: A platform for renting, sharing and reconciling Facebook ad accounts across companies, teams and members — with an integrated wallet.
year: "2025"
startDate: "2025-05"
current: true
role: Web Developer
teamSize: 6
stack: ["Vue 3.4", "Vuetify 3.6", "TypeScript 5.5", "Vite 5.3", "Pinia 2.2", "CASL", "ApexCharts", "openapi-fetch", "Strapi 5", "Node.js", "MySQL 8", "Redis (ioredis)", "Bull 4", "Firebase Admin 13", "Facebook Marketing API v25.0"]
featured: true
tint: "187,134,252"
order: 4
highlights:
  - Wallet with top-up, withdraw, recall and transfer, gated by a 72h spend check
  - Two-phase payments — atomic local ledger, then a queued Facebook spend-cap sync
  - Expiring public report links and BM health tracking with a primary-BM fallback
responsibilities:
  - area: Frontend — Admin & Customer Dashboards
    items:
      - Built most of both Vue 3 / Vuetify dashboards — ad-account lists, BM management, wallet and payment flows, members and teams, invitations, notifications and reconciliation reports with CASL RBAC.
      - Added a unified filter bar, mixed-currency money display, CSV export, server-side pagination and two-phase loading for large ad-account tables.
      - Shipped expiring public report share links and BM health warnings that block deposits to unavailable BMs.
  - area: Backend — Strapi API
    items:
      - Migrated the API to a Company & Team org model and a unified wallet, designing the team and ad-account-share models with N+1-free bulk share/revoke.
      - Built the transaction ledger service with company-scoped, IDOR-safe endpoints, admin top-up approval, ad-account withdrawal and optimistic-lock balance adjustments.
      - Hardened Facebook sync with retry and exponential backoff, serialized spend-cap updates to stop lost top-ups, and automatic Firebase wallet-sync recovery.
links:
  live: "#"
  code: "https://github.com/tenomad-company/hpma-user"
---

A full-stack Facebook ad-account platform that lets an agency rent and share ad accounts with client companies, their teams and members, run a wallet with top-ups, withdrawals and recalls synced to Facebook spend caps, and reconcile spending in reports. It comprises a Vue admin dashboard, a customer dashboard and a Strapi 5 API with Bull queues, Redis and Firebase real-time updates, planned spec-first in a dedicated docs repo.
