# REST API Documentation

Base URL: `/api`

## Authentication (`/api/auth`)

### Register Customer
- **URL**: `POST /api/auth/register`
- **Body**:
  ```json
  {
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "password": "Password123!"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "id": 1,
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "role": "ROLE_CUSTOMER"
  }
  ```

### Login
- **URL**: `POST /api/auth/login`
- **Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "Password123!"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "token": "eyJhbGciOi...",
    "type": "Bearer",
    "user": {
      "id": 1,
      "fullName": "Jane Doe",
      "email": "jane@example.com",
      "role": "ROLE_CUSTOMER"
    }
  }
  ```

## Accounts (`/api/accounts`)

### Get Customer Accounts
- **URL**: `GET /api/accounts`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` (Array of accounts)

### Create Account
- **URL**: `POST /api/accounts`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "accountType": "SAVINGS"
  }
  ```
- **Response**: `201 Created`

### Get Account Details
- **URL**: `GET /api/accounts/{id}`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`

## Banking Operations (`/api/transactions`)

### Deposit Funds
- **URL**: `POST /api/transactions/deposit`
- **Body**:
  ```json
  {
    "accountId": 1,
    "amount": 500.00,
    "description": "Salary deposit"
  }
  ```
- **Response**: `200 OK`

### Withdraw Funds
- **URL**: `POST /api/transactions/withdraw`
- **Body**:
  ```json
  {
    "accountId": 1,
    "amount": 100.00,
    "description": "ATM withdrawal"
  }
  ```
- **Response**: `200 OK`

### Fund Transfer
- **URL**: `POST /api/transfers`
- **Body**:
  ```json
  {
    "sourceAccountId": 1,
    "destinationAccountNumber": "1002345678",
    "amount": 250.00,
    "description": "Rent payment"
  }
  ```
- **Response**: `200 OK`

### Transaction History
- **URL**: `GET /api/transactions?accountId=1&page=0&size=20`
- **Response**: `200 OK` (Paginated list of transactions)

### Account Statements
- **URL**: `GET /api/statements?accountId=1&startDate=2026-01-01&endDate=2026-01-31`
- **Response**: `200 OK` (Statement metadata and transactions)

## Administrator (`/api/admin`)

### View All Accounts
- **URL**: `GET /api/admin/accounts`
- **Headers**: `Authorization: Bearer <token>` (`ROLE_ADMIN`)

### Update Account Status
- **URL**: `PATCH /api/admin/accounts/{id}/status`
- **Body**:
  ```json
  {
    "status": "FROZEN"
  }
  ```

### System Transactions Monitoring
- **URL**: `GET /api/admin/transactions`

### Manage Interest Rates
- **URL**: `POST /api/admin/interest-rates`
- **URL**: `POST /api/admin/interest/apply`
