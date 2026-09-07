# Development Roadmap

## Phase 1: Project Initialization & Architecture Setup
- Initialize Next.js App Router project.
- Configure Tailwind CSS, TypeScript, and absolute imports.
- Setup Supabase client and Vercel environment variables.
- Establish core folder structure (`/app`, `/components`, `/services`, `/lib`).

## Phase 2: Database Foundation & Security
- Write and execute initial Supabase migrations (`business_profiles`, `users`, `roles`).
- Implement Row Level Security (RLS) policies for multi-tenancy.
- Integrate Supabase Auth and Next.js middleware for route protection.

## Phase 3: Core Domain (Inventory & CRM)
- Build APIs and Services for `tractors` (Inventory).
- Build APIs and Services for `customers` (CRM).
- Create UI for managing Tractors and Customers.

## Phase 4: Sales & Operations
- Build `bookings` module (linking customer to tractor).
- Implement Cash and Bank Leasing workflows.
- Create UI for Sales Officers.

## Phase 5: Financials
- Build `payments` ledger.
- Implement Accountant UI for payment verification and approvals.

## Phase 6: Document Management
- Implement secure file upload utility (Validate, Compress, WebP).
- Integrate Supabase Private Storage.
- Build document attachment UI per booking.

## Phase 7: Delivery & PDI
- Build `pdi` (Pre-Delivery Inspection) module.
- Build `deliveries` module and final handover UI.

## Phase 8: Reporting & Auditing
- Develop reporting dashboard.
- Implement comprehensive audit logging.
- Final Vercel deployment validations and end-to-end testing.
