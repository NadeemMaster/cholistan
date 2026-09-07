# Security Review & Plan

## Authentication Flow
- Handled entirely via **Supabase Auth**.
- Users authenticate via Email/Password.
- JWT tokens are securely stored (HttpOnly cookies preferred for Next.js App Router).
- Next.js Middleware intercepts requests to protect private routes and API endpoints.

## Roles
The system defines strictly separated roles:
1. Super Admin
2. Business Admin
3. Sales Officer
4. Accountant
5. Inspector
6. Delivery Officer
7. Auditor

## Permissions (Authorization)
- Authorization is enforced at the **Database level** using PostgreSQL Row Level Security (RLS).
- API routes will also perform preliminary role checks to reject unauthorized requests early.
- Users cannot escalate privileges.

## Storage Security
- All documents must be stored in **Supabase Private Buckets**.
- No public access is allowed.
- The Next.js API will generate **Signed URLs** for authorized users to view/download documents.
- Upload process: Validation -> WebP Conversion (for images) -> Compression -> Secure Filename Generation -> Supabase Upload.

## Audit Logging
- An `audit_logs` table will track critical entity changes.
- Implementation via PostgreSQL Triggers for strict guarantee, or via the Service Layer for rich context (e.g., capturing the exact UI action).
- Logs include: `user_id`, `action`, `table_name`, `record_id`, `old_data`, `new_data`, `timestamp`, `ip_address`.
