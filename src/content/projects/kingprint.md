---
title: Kingprint
category: Manufacturing · ERP
tagline: A print-order management system that calculates production cost from man-hours and machine-hours.
year: "2024"
startDate: "2024-05"
endDate: "2024-11"
role: Web Developer
teamSize: 10
stack: ["TypeScript", "Vue 3", "Element Plus", "Vite", "Pinia", "vue-i18n", "CASL", "Python", "FastAPI", "PostgreSQL", "Redis"]
featured: false
tint: "255,107,53"
order: 12
highlights:
  - Detailed order management for outdoor & retail posters
  - Production cost engine based on man-hours & machine-hours
  - Vue 3 + Element Plus admin with EN/JA i18n and CASL role permissions
responsibilities:
  - area: Frontend — Vue 3 + Element Plus
    items:
      - Bootstrapped the admin app from vue-element-plus-admin and restructured menus and routing for company, department, user, project (list / Kanban / Gantt), factory and logistics management.
      - Implemented CASL-based permissions and theme settings with an uploadable company logo.
      - Built the project list with status and time filters and custom pagination for order tracking.
links:
  live: "#"
  code: "https://bear-team.backlog.com/git/KPS/kps-frontend/tree/dev"
---

Kingprint manages print orders — posters for outdoor and retail — and optimizes the workflow by computing production cost from man-hours and machine-hours. I set up the Vue 3 + Element Plus frontend — menus and routing, CASL permissions, theming and the project list — on a Python (FastAPI) backend over PostgreSQL.
