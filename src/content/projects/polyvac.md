---
title: Polyvac
category: HealthTech · Document Control
tagline: An SOP document-control system for a vaccine producer under the Ministry of Health — publish, number, stamp and revoke controlled copies.
year: "2024"
startDate: "2024-03"
endDate: "2024-07"
role: Web Developer
teamSize: 3
stack: ["TypeScript", "Vue 3", "Vuetify 3 (Vuexy)", "Pinia", "CASL", "pdf-lib", "ExcelJS", "Strapi 4", "PostgreSQL", "MinIO", "Redis", "Bull", "Docker"]
featured: false
tint: "0,200,150"
order: 14
highlights:
  - SOP publish, distribute and revoke flow with per-copy distribution numbering
  - Distribution codes and QA marks stamped onto PDFs client-side, with merge and print
  - CASL role permissions, facility/department scoping and dashboard statistics
responsibilities:
  - area: Frontend — Vue 3 + Vuetify
    items:
      - Set up the Vuexy-based app with the auth client, login and account management screens.
      - Built SOP/document management — upload, Excel code import, publish, revoke and versioning — organised by facility and department.
      - Implemented pdf-lib stamping of distribution codes and QA images onto every page, plus PDF merge and print-on-publish.
  - area: Platform
    items:
      - Configured CASL role permissions and the Docker deployment for the frontend.
      - Built the dashboard with weekly and yearly document statistics.
links:
  live: "#"
  code: "https://github.com/tenomad-company/pvc-frontend"
---

Polyvac is a document-control system for a vaccine production centre under Vietnam's Ministry of Health: SOPs and controlled forms are published as numbered copies, stamped with a QA mark, distributed by facility and department, and revoked when superseded. I built most of the Vue 3 + Vuetify frontend — including the pdf-lib stamping and print pipeline and CASL permissions — on a Strapi 4 / PostgreSQL / MinIO backend.
