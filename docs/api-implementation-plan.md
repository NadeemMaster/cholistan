# API Implementation Plan

## API Folder Structure
The Next.js App Router will house all APIs under `/app/api/v1/`:
```
/app
  /api
    /v1
      /auth
      /business-profiles
      /customers
      /tractors
      /bookings
      /payments
      /leasing
      /documents
      /pdi
      /deliveries
      /reports
```

## API Versioning
All endpoints will be prefixed with `/api/v1/` to allow future backwards-compatible changes without breaking existing integrations (e.g., mobile apps).

## Endpoint Naming Convention
RESTful standards apply:
- `GET /api/v1/customers` (List)
- `POST /api/v1/customers` (Create)
- `GET /api/v1/customers/[id]` (Read)
- `PATCH /api/v1/customers/[id]` (Update)
- `DELETE /api/v1/customers/[id]` (Delete - soft delete preferred)

## Request Validation
- **Tool**: Zod.
- Every API endpoint that accepts a payload must validate the `req.body` against a Zod schema before passing data to the Service Layer.

## Response Format
Standardized JSON wrapper for all endpoints:
```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

## Error Handling
- Use standard HTTP status codes (200, 201, 400, 401, 403, 404, 500).
- Catch-all error handlers in route blocks.
- Map Service Layer exceptions to appropriate API error responses without leaking database internals.
