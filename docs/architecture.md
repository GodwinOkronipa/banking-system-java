# System Architecture

## Overview
The Java Banking Management System is built following a clean, three-tier client-server architecture designed for high maintainability, separation of concerns, and security.

```
                 CUSTOMER / ADMIN
                        |
                        |
                  WEB BROWSER
                        |
                        v
              REACT FRONTEND (VITE)
                        |
                        |
                  REST API / HTTP (JSON / JWT)
                        |
                        v
              JAVA SPRING BOOT
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
      CONTROLLERS    SERVICES     SECURITY
          |             |             |
          +-------------+-------------+
                        |
                        v
                SPRING DATA JPA
                        |
                        v
                  MYSQL DATABASE
```

## Layers

### 1. Presentation Layer (Frontend)
- **Technology**: React 18, Vite, Tailwind CSS, Lucide React, React Router
- **Role**: Handles user interfaces for both Customer and Administrator portals.
- **Responsibilities**:
  - Present dashboards, account cards, and financial charts.
  - Collect and client-side validate form inputs (positive amounts, valid account numbers, email formats).
  - Manage authentication tokens (JWT) and secure protected routes.
  - Communicate with the backend via RESTful JSON APIs.

### 2. Application Layer (Backend)
- **Technology**: Java 17+, Spring Boot 3.x
- **Components**:
  - **Controllers**: Expose REST endpoints under `/api/*`, handle HTTP requests/responses, and perform initial validation (`@Valid`).
  - **Security**: Spring Security filter chain with JWT authentication, BCrypt password hashing, and role-based access control (`ROLE_CUSTOMER`, `ROLE_ADMIN`).
  - **Services**: Enforce banking business logic, transaction isolation (`@Transactional`), balance checks, and interest calculation.
  - **Repositories**: Spring Data JPA repositories with custom query methods and locking mechanisms (`PessimisticLock` / `OptimisticLock`).
  - **DTOs & Mappers**: Decouple database entity structures from API contracts.
  - **Exception Handling**: Global exception handler (`@ControllerAdvice`) providing standardized error responses.

### 3. Data Layer (Persistence)
- **Technology**: MySQL 8+, Spring Data JPA / Hibernate, Flyway
- **Role**: Reliable, ACID-compliant persistence for banking entities.
- **Responsibilities**:
  - Relational schema enforcing referential integrity.
  - Database versioning and migrations managed via Flyway.
  - High precision financial storage using `DECIMAL(19, 2)`.
