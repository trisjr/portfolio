---
title: High Performance Marketing Ads
category: AdTech · FinOps
tagline: A high-performance platform for renting, sharing and reconciling Facebook ad accounts across a 3-tier org.
year: "2025"
startDate: "2025-05"
current: true
role: Web Developer
teamSize: 5
stack: ["Vue 3.4", "Vuetify 3.6", "TypeScript 5.5", "Vite 5.3", "Pinia 2.2", "CASL", "ApexCharts", "Strapi 5", "Node.js", "MySQL", "Redis (ioredis)", "Bull 4", "Firebase Admin 13", "Facebook Marketing API"]
featured: true
tint: "187,134,252"
order: 3
highlights:
  - Two-phase financial sync with concurrency control & Bull queues
  - CASL RBAC across the Company → Team → Member hierarchy
  - Integrated wallet — top-up, withdraw, recall, transfer with 72h spending-limit checks
responsibilities:
  - area: Frontend — HPMA Dashboard
    items:
      - Developed ads account management, BM CRUD, financial history, reconciliation reports, payment & ledger, team/member management, and a notification system with CASL RBAC.
      - Built two-phase data loading with chunked enrichment, an OpenAPI Fetch type-safe API layer, Firebase real-time payment notifications, and Pinia stores for auth/currency/financial state.
  - area: Backend — API
    items:
      - Designed 20 content types with a cascading share model (Admin → Company → User), a hierarchical wallet system, and IDOR-prevention middleware.
      - Built Bull queue-driven financial processing, a Facebook Marketing API v25.0 two-phase sync with rate limiting, Redis caching, and Firebase real-time triggers.
links:
  live: "#"
  code: "https://github.com/tenomad-company/hpma-os"
---

A full-stack Facebook Ads account management platform enabling agencies to manage Business Managers, share/revoke ad accounts across a Company → Team → User hierarchy, handle wallet deposits/withdrawals with Facebook balance sync, and generate reconciliation reports. The system comprises an Admin dashboard, a Customer-facing dashboard, and a Strapi 5 backend with real-time Firebase notifications and Bull queue-driven financial processing.
