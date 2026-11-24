# Database Design

## Overview
The database uses MySQL 8+ and enforces ACID compliance for all financial transactions. Schema migrations are managed version-by-version using Flyway.

## Tables & Schema

### 1. `users`
Stores user profile information, authentication credentials, and system roles.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| `full_name` | VARCHAR(100) | NOT NULL | Customer or Admin full name |
| `email` | VARCHAR(150) | NOT NULL, UNIQUE | User email address (login credential) |
| `password_hash` | VARCHAR(255) | NOT NULL | BCrypt hashed password |
| `role` | VARCHAR(20) | NOT NULL | Role: `ROLE_CUSTOMER`, `ROLE_ADMIN` |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Account creation timestamp |

### 2. `accounts`
Stores individual bank accounts held by users.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique account ID |
| `account_number` | VARCHAR(20) | NOT NULL, UNIQUE | Generated 10-12 digit unique account number |
| `user_id` | BIGINT | NOT NULL, FK -> `users(id)` | Owning user ID |
| `account_type` | VARCHAR(20) | NOT NULL | Type: `SAVINGS`, `CHECKING` |
| `balance` | DECIMAL(19, 2) | NOT NULL, DEFAULT 0.00 | Current account balance |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'ACTIVE' | Status: `ACTIVE`, `FROZEN`, `CLOSED` |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Account creation date |

### 3. `transactions`
Immutable ledger of financial movements (deposits, withdrawals, transfers, interest).

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique transaction ID |
| `account_id` | BIGINT | NOT NULL, FK -> `accounts(id)` | Main account involved |
| `related_account_id`| BIGINT | NULL, FK -> `accounts(id)` | Counterparty account for transfers |
| `transaction_type` | VARCHAR(20) | NOT NULL | Type: `DEPOSIT`, `WITHDRAWAL`, `TRANSFER_OUT`, `TRANSFER_IN`, `INTEREST` |
| `amount` | DECIMAL(19, 2) | NOT NULL | Transaction monetary amount |
| `balance_before` | DECIMAL(19, 2) | NOT NULL | Balance before transaction execution |
| `balance_after` | DECIMAL(19, 2) | NOT NULL | Balance after transaction execution |
| `reference` | VARCHAR(64) | NOT NULL, INDEX | Unique transaction reference (UUID/Ref) |
| `description` | VARCHAR(255) | NULL | Purpose or note |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Transaction timestamp |

### 4. `interest_rates`
Configuration table for savings interest calculation.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `account_type` | VARCHAR(20) | NOT NULL | Target account type (e.g. `SAVINGS`) |
| `annual_rate` | DECIMAL(8, 5) | NOT NULL | Configured rate (e.g. 0.04500 for 4.5%) |
| `effective_from` | DATE | NOT NULL | Date from which rate applies |
| `active` | BOOLEAN | NOT NULL, DEFAULT TRUE | Status flag |

## Integrity Rules
1. **Precision**: All financial amounts use `DECIMAL(19, 2)` to eliminate floating-point inaccuracies.
2. **Double Entry Transfers**: Fund transfers create atomic pair entries (`TRANSFER_OUT` and `TRANSFER_IN`) sharing identical `reference` UUIDs.
3. **No Overdrafts**: Balance checks guarantee `balance >= 0` for non-overdraft accounts.
