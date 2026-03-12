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

### To Do List

- [ ] Create Mongoose schemas for User, Subscription, Transaction.  
- [ ] Implement auth routes and JWT flow.  
- [ ] Add bcrypt hashing on user creation.  
- [ ] Build auth middleware and role middleware.  
- [ ] Build ownership middleware and attach to subscription/transaction routes.  
- [ ] Add Joi/express-validator schemas and central error handler.  
- [ ] Implement transaction creation logic with monthly limit warning.  
- [ ] Add `GET /users/me/financial-summary`.  
- [ ] Draw required UML diagrams and add to repo.  
- [ ] Test endpoints and verify HTTP statuses and JSON errors.

If you want, I can convert the route list into a Postman collection or a minimal OpenAPI spec next.
