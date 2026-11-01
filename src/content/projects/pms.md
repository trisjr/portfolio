---
title: Project Management System
category: Enterprise · Workflow
tagline: An enterprise project-development data platform — hierarchical documents, versioning, multi-level approvals and OCR across web and mobile.
year: "2025"
startDate: "2025-11"
endDate: "2026-03"
role: Frontend Lead
teamSize: 15
stack: ["React 19", "TypeScript", "Vite 7", "Turborepo", "TanStack Router/Query/Table", "XState Store", "React Aria", "React Hook Form", "Zod", "Tailwind CSS 4", "CASL", "dxf-viewer", "Socket.IO", "NestJS 11", "TypeORM", "PostgreSQL", "BullMQ", "Elasticsearch", "Azure (SSO, Blob)", "Flutter", "FastAPI"]
featured: true
tint: "0,217,255"
order: 7
highlights:
  - Led the web frontend — reviewed and merged 225 of 472 merged pull requests
  - CASL role permissions, Azure SSO login and proactive token refresh app-wide
  - Project setup with templates, custom fields, CSV/Excel import and CAD/DXF preview
responsibilities:
  - area: Frontend — Sun Web App
    items:
      - Built the admin shell (AdminLayout, tabbed layouts, DataTable, nested sidebar) and redesigned login with Azure SSO and Vietnamese/English i18n.
      - Implemented CASL authorization — role/permission checks, a NotAuthorized route and permission-aware navigation — plus the roles, users and permissions management screens.
      - Delivered global auth-token handling with proactive refresh and forced logout, plus app-wide API error handling.
      - Built project creation — template selection, folder-structure tree, custom fields, user/department permission dialogs filtered by region and area, draft save and project-code generation.
      - Built template management with region/area filtering and CSV/Excel import of folder structures.
      - Added DXF/DWG CAD preview to the document viewer and optimized task and document screens for mobile.
  - area: Frontend Lead & Workflow
    items:
      - Reviewed and merged 225 of 472 merged frontend PRs between Nov 2025 and Mar 2026.
      - Drove the GitHub Copilot coding agent through 36 merged PRs (SSO flow, role/user APIs, dnd-kit template tree, CASL integration) and wrote the repo's AI-agent guidelines (AGENTS.md).
      - Moved development deployment builds onto GitHub Actions with secret-driven environment generation.
links:
  live: "#"
  code: "https://github.com/tenomad-company/sun-frontend"
---

PMS centralizes a large developer's project records — hierarchical folders and documents, versioning, tasks and multi-level approvals — across a React web app, a NestJS API, a Flutter mobile app and a FastAPI OCR service. I led the web frontend through its first build phase, owning authorization, Azure SSO, project and template setup and CAD preview, and reviewed roughly half of all frontend pull requests.
