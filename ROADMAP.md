### Overview

A FinTech startup is building **SubLedger**, a backend API to track and manage users’ digital subscriptions (streaming, SaaS, online services).  
This repo brief focuses on the **backend**: secure API, Express middlewares, JWT auth, MongoDB relations, and clear validation. Keep things simple, testable, and forgiving for ADHD workflows: small tasks, clear acceptance criteria, and visible next steps.

---

### Goals

- **Primary**: Build a secure REST API that lets users manage subscriptions and transactions and lets admins supervise users.  
- **Must support**: per-user data isolation, admin global views, JWT authentication, bcrypt password hashing, and Mongoose relations.  
- **Focus areas**: backend security, Express middlewares, input validation, ownership checks, error handling.

---

### Data Models

| Collection | Key fields | Constraints |
|---|---:|---|
| **User** | **id; name; email; password; role; createdAt** | **email unique; password hashed with bcrypt** |
| **Subscription** | **id; name; price; billingCycle; startDate; status; userId; createdAt** | **price > 0; belongs to one user** |
| **Transaction** | **id; amount; paymentDate; status; subscriptionId; createdAt** | **amount > 0; linked to existing subscription** |

**Field notes**

- **role** values: `user` or `admin`.  
- **billingCycle** values: `monthly` or `yearly`.  
- **status** for subscription: `active` or `cancelled`.  
- **status** for transaction: `paid` or `failed`.

---

### Routes and User Stories

#### Authentication and Users
- `POST /auth/register` — create account.  
- `POST /auth/login` — returns **JWT**.  
- `GET /users` — **admin only** list all users.  
- `GET /users/:id` — **admin only** view user profile with subscriptions and totals.  
- `GET /users/me/financial-summary` — user summary (bonus).

#### Subscriptions
- `POST /subscriptions` — create subscription (authenticated user).  
- `GET /subscriptions` — list current user subscriptions.  
- `GET /subscriptions/:id` — return subscription details, its transactions, and total spent.  
- `PUT /subscriptions/:id` — update subscription (owner only).  
- `DELETE /subscriptions/:id` — delete subscription (owner only).

#### Transactions
- `POST /transactions` — create transaction linked to a subscription. Returns warning if monthly limit exceeded.  
- `GET /transactions/subscription/:subscriptionId` — list transactions for a subscription (owner or admin).  
- `GET /transactions/user/:userId` — admin only view all transactions for a user.

#### Quick acceptance checklist for each route
- ✅ Auth required where needed  
- ✅ Ownership check before read/write  
- ✅ Joi or express-validator input validation  
- ✅ Clear JSON error responses and consistent HTTP status codes

---

### Security Middlewares and Validation

#### Middlewares to implement
- **Auth middleware**  
  - Verify JWT, attach `req.user`, block invalid tokens.
- **Role middleware**  
  - Check `req.user.role` and allow admin-only routes.
- **Ownership middleware**  
  - Confirm resource `userId` or subscription owner matches `req.user.id`.
- **Error handler middleware**  
  - Centralize errors, return JSON `{ error: message, details?: ... }`.

#### Passwords and Auth
- **Hash passwords** with bcrypt before saving.  
- **JWT** for authentication; token required in `Authorization: Bearer <token>` header.

#### Validation rules (use Joi or express-validator)
- **User**: `email` required and valid; `password` required.  
- **Subscription**: `name` required; `price` > 0; `billingCycle` in allowed values.  
- **Transaction**: `amount` > 0; `paymentDate` valid date; `subscriptionId` exists.

---

### Bonus Features, UML, Tech Stack, Deliverables and Timeline

#### Bonus features
- **Monthly spending limit** per user  
  - When creating a transaction, compute current month total; if it exceeds the limit, **do not block** the transaction but return a warning in the response.
- **Financial summary route**  
  - `GET /users/me/financial-summary` returns: **total subscriptions; total spent; most expensive subscription; least expensive subscription**.

#### UML and design artifacts
- Required before implementation: **Use Case Diagram**, **Class Diagram**, **Sequence Diagram**.

#### Tech stack and constraints
- **Node.js** + **Express**  
- **MongoDB** with **Mongoose**  
- Use **async/await**, consistent HTTP statuses, JSON-only responses, and proper error handling.

#### Deliverables and timeline
- **Work mode**: individual.  
- **Duration**: 5 days.  
- **Start**: 2026-03-09 11:30.  
- **Deadline**: 2026-03-13 before 23:59 — late submissions rejected.  
- **Final GitHub push**: Sunday before 23:59.

---

### Remaining Roadmap (Post-v1)

Only the features still missing after the first implementation pass are listed below.

- [ ] Add a Transaction model and related validation schema (amount, paymentDate, status, subscriptionId).
- [ ] Add transaction endpoints:
  - `POST /transactions`
  - `GET /transactions/subscription/:subscriptionId`
  - `GET /transactions/user/:userId` (admin only)
- [ ] Implement monthly spending limit warning logic during transaction creation (warn, do not block).
- [ ] Extend subscription details response to include its transactions and total spent.
- [ ] Add admin user detail endpoint to return one user with subscriptions and totals (`GET /admin/users/:id` or equivalent).
- [ ] Add `GET /users/me/financial-summary` with: total subscriptions, total spent, most expensive subscription, least expensive subscription.
- [ ] Complete missing UML artifacts (Use Case Diagram and Sequence Diagram).
- [ ] Update OpenAPI and Bruno requests for all new/remaining endpoints.
- [ ] Test all newly added routes and error paths; verify consistent JSON error responses and HTTP statuses.

