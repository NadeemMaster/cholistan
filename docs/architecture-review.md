# Architecture Review

## Application Architecture
The system will follow a clean, layered architecture to ensure separation of concerns and maintainability.

**Frontend (Next.js App Router)**
- React Server Components for data fetching and SEO (where applicable).
- Client Components for interactive UI elements.
- TailwindCSS for styling (or custom CSS as per requirements).

**API Layer (Next.js Route Handlers & Server Actions)**
- Acts as the interface between the Frontend and the Service Layer.
- Handles HTTP requests, basic payload validation (using Zod), and auth token verification.

**Service Layer (TypeScript Classes/Functions)**
- Contains all pure business logic (e.g., calculating leasing installments, checking inventory thresholds).
- Completely decoupled from the UI.

**Database Layer (Supabase PostgreSQL)**
- Handles all data persistence.
- Supabase Client used for queries.
- Business rules enforced via Row Level Security (RLS).

*Data Flow:*
`UI Component` -> `API / Server Action` -> `Service Layer` -> `Database`

## Business Architecture Implementation Plan
- **Business Profile**: Global configuration for multi-client support. All queries will scope to the active business profile.
- **Customers**: CRM module tracking customer details, history, and documents.
- **Bookings**: Central entity linking a Customer, a Tractor, and Payment/Leasing plans.
- **Cash Workflow**: Direct payment tracking against a booking.
- **Leasing Workflow**: Bank leasing integration, installment tracking, and approval flows.
- **Tractor/Product Tracking**: Inventory management, chassis/engine number tracking, and status (Available, Booked, Delivered).
- **Documents**: Supabase Private Storage integration with structured folder paths per booking.
- **PDI (Pre-Delivery Inspection)**: Checklist and approval workflow before handover.
- **Delivery**: Final handover process, generating delivery challans and updating tractor status.
- **Reports**: Aggregated views for sales, pending payments, inventory levels, and operational metrics.
