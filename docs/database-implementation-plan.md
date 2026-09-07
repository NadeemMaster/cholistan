# Database Implementation Plan

## Required Tables
1. `business_profiles`: Stores dealership config, logo URL, name.
2. `users`: Extended user profile linking to Supabase Auth `auth.users`.
3. `roles`: Defines system roles.
4. `user_roles`: Mapping users to roles.
5. `customers`: Customer CRM data.
6. `tractors`: Inventory data (Chassis, Engine, Status).
7. `bookings`: Links Customer and Tractor, tracks overall sale status.
8. `payments`: Ledger for payments against bookings.
9. `leasing_cases`: Details for bank leasing (Bank name, approval status, terms).
10. `documents`: Metadata for files in Supabase Storage.
11. `pdi`: Pre-delivery inspection records and checklists.
12. `deliveries`: Final delivery records.
13. `audit_logs`: Immutable log of critical actions.

## Relationships
- `users` belongs to `business_profiles`.
- `customers` belongs to `business_profiles`.
- `tractors` belongs to `business_profiles`.
- `bookings` belongs to `customers`, `tractors`, and `business_profiles`.
- `payments` belongs to `bookings`.
- `leasing_cases` belongs to `bookings`.
- `documents` belongs to `bookings` or `customers`.
- `pdi` belongs to `bookings`.
- `deliveries` belongs to `bookings`.

## Migration Sequence
1. `001_initial_schema.sql`: Setup `business_profiles`, `users`, `roles`, and basic RLS.
2. `002_crm_inventory.sql`: Setup `customers`, `tractors`.
3. `003_sales_core.sql`: Setup `bookings`, `payments`, `leasing_cases`.
4. `004_operations.sql`: Setup `pdi`, `deliveries`, `documents`.
5. `005_audit_triggers.sql`: Setup database triggers for `audit_logs`.

## RLS (Row Level Security) Requirements
- **Tenant Isolation**: Every query must automatically filter by the user's assigned `business_profile_id`.
- **Role Policies**: 
  - `Super Admin`: Full access across all profiles (if multi-tenant support demands it).
  - `Business Admin`: Full access within their `business_profile_id`.
  - `Sales Officer`: Read/Write to bookings and customers, Read-only inventory.
  - `Accountant`: Read/Write to payments, Read-only bookings.
  - `Inspector`: Read/Write to PDI.
  - `Delivery Officer`: Read/Write to Deliveries.
- No direct bypassing of RLS from the frontend client.
