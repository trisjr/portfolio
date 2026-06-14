---
title: Project Management System
category: Enterprise · Workflow
tagline: A full-lifecycle project & document platform with multi-level approvals, versioning and CAD/OCR processing.
year: "2025"
startDate: "2025-10"
endDate: "2026-05"
role: Web Developer
teamSize: 10
stack: ["React 19", "TypeScript", "Vite", "TanStack Router/Query/Table", "Zustand", "React Hook Form", "Zod", "Tailwind CSS 4", "Tiptap", "CASL", "NestJS 11", "TypeORM", "PostgreSQL", "Redis", "Socket.IO", "BullMQ", "Passport (JWT + Azure OAuth2)", "Elasticsearch", "Azure Blob", "AWS S3"]
featured: true
tint: "0,217,255"
order: 4
highlights:
  - 31 NestJS modules & 33+ entities powering Project → Folder → Document → Task chains
  - Multi-level approval workflow scoped by region / area / department
  - Document pipeline with OCR, CAD/DXF preview & real-time progress tracking
responsibilities:
  - area: Frontend — Sun Web App
    items:
      - Built project management (CRUD, React Hook Form + Zod, CASL permissions) and a profile view with a hierarchical document/folder table.
      - Implemented document management — drag-and-drop upload, folder-tree navigation, versioning UI, file preview (PDF, DXF/CAD, images) and batch operations.
      - Developed the task/assignment system (task-document linking, checklists, overdue tracking, approval-workflow tabs) and multi-level approval configuration scoped by region/area/department.
      - Delivered template management with drag-and-drop reordering (@dnd-kit), master-data management on TanStack Table, global search, audit-log viewer, real-time notifications (Socket.IO + FCM) and a Tiptap rich-text editor.
  - area: Backend — API
    items:
      - Architected 31 modular NestJS modules with 33+ TypeORM entities and complex relationships (Project ↔ Folder ↔ Document ↔ Task, self-referencing tasks, multi-level approval chains).
      - Implemented authentication with JWT + Azure AD OAuth2, token revocation (Cuckoo filter) and role-based guards.
      - Built the document pipeline — upload with WebSocket progress tracking, versioning, OCR (BullMQ), CAD processing and multi-storage (Azure Blob, AWS S3).
      - Added a sequential multi-level approval engine with snapshots, full-text search (Elasticsearch + Azure Cognitive Search), Excel import/export, custom fields, audit logging and i18n.
links:
  live: "#"
  code: "https://github.com/tenomad-company/sun-frontend"
---

PMS manages the full project lifecycle — hierarchical documents, task assignment and multi-level approvals — in a React monorepo on a NestJS backend. It handles document versioning, OCR/CAD processing, Elasticsearch search, real-time notifications and Vietnamese/English i18n.
