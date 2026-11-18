# banking-system-java
Java Banking Management System

A full-stack banking simulation built with Java Spring Boot, React, and MySQL as part of a Java Programming course.

The system provides a web-based environment where customers can create accounts, manage their finances, perform transactions, view transaction histories, and generate account statements. Administrators can oversee customer accounts and monitor banking activities.

⸻

1. Project Overview

The Java Banking Management System is an academic software engineering project designed to simulate the fundamental operations of a banking institution.

The application consists of two primary interfaces:

* Customer Portal: Allows customers to register, log in, manage accounts, perform banking transactions, and access financial records.
* Administrator Portal: Allows administrators to manage customer accounts, monitor transactions, and configure banking operations.

The project demonstrates the practical application of Java programming, object-oriented programming, database management, RESTful API development, frontend integration, authentication, and software engineering principles.

Project Objectives

1. Develop a functional web-based banking simulation.
2. Apply object-oriented programming principles using Java.
3. Implement secure authentication and role-based access.
4. Design and integrate a relational database.
5. Implement essential banking operations.
6. Demonstrate client-server communication through REST APIs.
7. Practice collaborative software development using Git and GitHub.

⸻

2. Technology Stack

Component	Technology
Backend	Java 17+ / Spring Boot 3.x
Frontend	React
Frontend tooling	Vite
Programming language (frontend)	JavaScript
Database	MySQL 8+
ORM	Spring Data JPA / Hibernate
API architecture	RESTful APIs
Authentication	Spring Security
Password security	BCrypt
Build tool	Maven
Version control	Git and GitHub
Testing	JUnit 5, Mockito, Spring Boot Test
API testing	Postman
Database migration	Flyway

Architecture: Three-tier client-server architecture.

⸻

3. System Features and Functional Requirements

3.1 User Authentication and Authorization

* Customer registration.
* Secure customer login and logout.
* Password hashing.
* Role-based access control.
* Protected customer and administrator routes.
* Session or token-based authentication.

3.2 Account Management

* Create bank accounts.
* Generate unique account numbers.
* View account information.
* View available account balances.
* Support different account types.
* Account status management: Active, Frozen, and Closed.

3.3 Deposits

* Deposit money into an account.
* Validate deposit amounts.
* Update account balances.
* Generate transaction references.
* Record successful deposits.

3.4 Withdrawals

* Withdraw money from an account.
* Validate available balances.
* Prevent overdrafts.
* Reject invalid transaction amounts.
* Record successful withdrawals.

3.5 Fund Transfers

* Transfer money between registered accounts.
* Validate recipient account details.
* Check available balances.
* Prevent transfers to the same account.
* Update both account balances atomically.
* Generate transaction references.

3.6 Transaction History

* View previous transactions.
* Filter transactions by type.
* Filter transactions by date.
* View transaction amounts and timestamps.
* View transaction references and descriptions.

3.7 Interest Management

* Configure an annual interest rate.
* Calculate interest based on account balances.
* Credit interest to eligible accounts.
* Record interest payments as transactions.

For the academic simulation, interest calculations will use a simplified formula:

Simple annual interest:

Interest = Principal × Annual Rate × Time

The interest rate and calculation period will be configurable by the administrator.

3.8 Account Statements

* Generate account statements.
* Display account information.
* Display transaction records within a selected period.
* Calculate opening and closing balances.
* Download statements in PDF format.

3.9 Administrator Management

* View registered customers.
* View customer accounts.
* Freeze or activate accounts.
* Monitor banking transactions.
* View system-wide transaction records.
* Configure interest rates.

⸻

4. Project Scope

Included in the first release

* Customer registration and authentication.
* Account creation and management.
* Deposits and withdrawals.
* Internal account-to-account transfers.
* Transaction history.
* Interest calculations.
* Account statements.
* Administrator dashboard.
* MySQL database integration.

Outside the project scope

The following features are excluded from the initial implementation:

* Integration with actual commercial banks.
* Real-money payment processing.
* Mobile money integration.
* ATM hardware integration.
* International transfers.
* Loan applications and management.
* Biometric authentication.
* Production-grade financial regulatory compliance.

Project limitation: This application is an academic banking simulation. It is not intended to handle real customer funds or replace an actual banking platform.

⸻

5. System Architecture

The application follows a three-tier architecture.

5.1 Presentation Layer

Technology: React

Responsible for the user interface and customer interactions.

Responsibilities:

* Display application pages.
* Collect user input.
* Validate form inputs on the client side.
* Communicate with the backend API.
* Display transaction results.
* Manage frontend navigation.

5.2 Application Layer

Technology: Java Spring Boot

Responsible for the application’s business logic.

Responsibilities:

* Process incoming API requests.
* Authenticate users.
* Validate banking operations.
* Execute deposits, withdrawals, and transfers.
* Calculate interest.
* Generate account statements.
* Communicate with the database.

5.3 Data Layer

Technology: MySQL + Spring Data JPA

Responsible for persistent data storage.

Responsibilities:

* Store customer information.
* Store account information.
* Store transaction records.
* Retrieve account balances.
* Maintain relationships between database entities.
* Ensure data consistency.

Architecture Diagram

                 CUSTOMER / ADMIN
                        |
                        |
                  WEB BROWSER
                        |
                        v
              REACT FRONTEND (VITE)
                        |
                        |
                  REST API / HTTP
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

⸻

6. Database Design

The system will use a relational MySQL database.

6.1 Proposed Database Tables

Table	Description
users	Customer and administrator information
accounts	Bank account information
transactions	Banking transaction records
interest_rates	Interest rate configurations

Account statements will be generated from existing transaction records rather than requiring a separate statements table.

6.2 Entity Relationships

Users and Accounts

* One user can own multiple accounts.
* Each account belongs to one user.

Accounts and Transactions

* One account can have multiple transactions.
* Each transaction is associated with an account.

Transfers

* A transfer involves a sending account and a receiving account.
* Each transfer is represented by two transaction records sharing a common reference.

6.3 Suggested Database Fields

Users

Field	Type
id	BIGINT
full_name	VARCHAR
email	VARCHAR
password_hash	VARCHAR
role	VARCHAR
created_at	TIMESTAMP

Accounts

Field	Type
id	BIGINT
account_number	VARCHAR
user_id	BIGINT
account_type	VARCHAR
balance	DECIMAL(19,2)
status	VARCHAR
created_at	TIMESTAMP

Transactions

Field	Type
id	BIGINT
account_id	BIGINT
related_account_id	BIGINT (nullable)
transaction_type	VARCHAR
amount	DECIMAL(19,2)
balance_before	DECIMAL(19,2)
balance_after	DECIMAL(19,2)
reference	VARCHAR
description	VARCHAR
created_at	TIMESTAMP

Transaction types will include:

* DEPOSIT
* WITHDRAWAL
* TRANSFER_OUT
* TRANSFER_IN
* INTEREST

Interest Rates

Field	Type
id	BIGINT
account_type	VARCHAR
annual_rate	DECIMAL(8,5)
effective_from	DATE
active	BOOLEAN

Database Design Considerations

* Account numbers must be unique.
* Email addresses must be unique.
* Foreign keys must maintain referential integrity.
* Monetary values must use DECIMAL.
* Passwords must never be stored as plain text.
* Transaction records must be preserved.
* Database changes should be managed using Flyway migrations.

⸻

7. Banking Business Rules

The following rules must be enforced by the backend.

1. A customer cannot withdraw more money than their available balance.
2. Deposits and withdrawals must have positive amounts.
3. Transfers must have valid sender and recipient accounts.
4. A customer cannot transfer money to the same account.
5. Frozen or closed accounts cannot perform transactions.
6. Every successful financial operation must generate a transaction record.
7. Failed transactions must not alter account balances.
8. Transfers must be processed atomically using database transactions.
9. Customers can only access accounts they are authorized to manage.
10. Administrators have separate permissions from ordinary customers.

Transaction Integrity

Fund transfers must use Spring’s @Transactional annotation.

This ensures that both sides of a transfer succeed or fail together.

For example:

@Transactional
public void transferMoney(
    Long senderId,
    Long receiverId,
    BigDecimal amount
) {
    // Validate accounts and amount.
    // Check sender balance.
    // Debit sender.
    // Credit receiver.
    // Record both transaction entries.
}

The implementation must also prevent concurrent transactions from causing incorrect balances, using appropriate database locking or concurrency controls.

⸻

8. Proposed Project Directory Structure

java-banking-system/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/bank/
│   │   │   │   ├── BankingApplication.java
│   │   │   │   │
│   │   │   │   ├── controller/
│   │   │   │   ├── service/
│   │   │   │   ├── repository/
│   │   │   │   ├── model/
│   │   │   │   ├── dto/
│   │   │   │   ├── security/
│   │   │   │   ├── config/
│   │   │   │   └── exception/
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── db/migration/
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── architecture.md
│   ├── database-design.md
│   └── api-documentation.md
│
├── .gitignore
└── README.md

⸻

9. Team Structure and Responsibilities

The project will be developed by a seven-member team.

Each member will own a primary development area while collaborating with other members during integration and testing.

Member	Role	Primary Responsibilities
Member 1	Project Lead & Integration	Architecture, coordination, GitHub management, code reviews and integration
Member 2	Authentication & Security	Registration, login, password hashing, roles and access control
Member 3	Account Management	User profiles, account creation, account numbers and account status
Member 4	Banking Operations	Deposits, withdrawals, balance validation and transaction recording
Member 5	Interest & Statements	Interest calculations, transaction filtering and PDF statements
Member 6	Frontend Development	React components, dashboards, forms and application styling
Member 7	Administration, Database & Testing	Admin functionality, database management, test cases and integration testing

Project Lead Responsibilities

The project lead is responsible for:

* Defining the project scope.
* Establishing coding standards.
* Coordinating the seven contributors.
* Managing the GitHub repository.
* Reviewing pull requests.
* Resolving integration conflicts.
* Monitoring project milestones.
* Ensuring all modules work together.

All team members are expected to contribute to documentation, testing and final demonstrations.

⸻

10. Git and GitHub Collaboration Workflow

The project will use Git and GitHub for version control and team collaboration.

Branching Strategy

The main branch will contain stable, integrated code.

Each member should develop features on separate branches.

Example:

main
│
├── feature/authentication
├── feature/account-management
├── feature/banking-operations
├── feature/interest-statements
├── feature/frontend
├── feature/admin
└── feature/testing

Development Rules

1. Clone the central repository.
2. Create a branch for your assigned feature.
3. Implement your changes.
4. Test your implementation locally.
5. Commit changes using meaningful commit messages.
6. Push the feature branch.
7. Create a pull request.
8. Request code review.
9. Merge only after approval and successful checks.

Commit Message Examples

feat: implement customer registration
feat: add deposit functionality
feat: implement account transfers
fix: prevent withdrawal beyond balance
test: add transaction service tests
docs: update database documentation

No team member should push unfinished or untested changes directly to main.

⸻

11. Installation and Setup

Prerequisites

Ensure the following are installed:

* Java Development Kit (JDK 17 or later).
* Maven.
* Node.js and npm.
* MySQL Server.
* Git.
* IntelliJ IDEA, VS Code or another compatible IDE.
* Postman (recommended).

Step 1: Clone the Repository

git clone https://github.com/YOUR-USERNAME/java-banking-system.git
cd java-banking-system

Step 2: Configure MySQL

Create a database:

CREATE DATABASE banking_system;

Configure your database credentials using environment variables or a local configuration file.

Example application.properties:

spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
server.port=8080

Use Flyway migrations to create and update database tables.

Do not commit database passwords or other secrets to GitHub.

Step 3: Run the Backend

Navigate to the backend directory:

cd backend

Install dependencies and start the Spring Boot application:

mvn clean install
mvn spring-boot:run

Backend server:

http://localhost:8080

Step 4: Run the Frontend

Open another terminal:

cd frontend

Install dependencies:

npm install

Start the React development server:

npm run dev

Frontend application:

http://localhost:5173

Step 5: Connect Frontend and Backend

Configure the frontend API base URL through an environment variable.

Example .env:

VITE_API_BASE_URL=http://localhost:8080/api

Configure CORS on the backend to allow requests from the local React development server.

⸻

12. Proposed REST API Endpoints

The Spring Boot backend will expose RESTful endpoints.

Method	Endpoint	Description
POST	/api/auth/register	Register customer
POST	/api/auth/login	Authenticate customer
POST	/api/auth/logout	Logout
GET	/api/accounts	Get customer’s accounts
POST	/api/accounts	Create account
GET	/api/accounts/{id}	Get account details
POST	/api/transactions/deposit	Deposit money
POST	/api/transactions/withdraw	Withdraw money
POST	/api/transfers	Transfer money
GET	/api/transactions	Get transaction history
GET	/api/transactions/{id}	Get transaction details
GET	/api/statements	Generate or retrieve statement
GET	/api/admin/accounts	View all accounts
PATCH	/api/admin/accounts/{id}/status	Update account status
GET	/api/admin/transactions	View system transactions
POST	/api/admin/interest-rates	Configure interest rates
POST	/api/admin/interest/apply	Apply interest simulation

All endpoints must enforce appropriate authentication, authorization and input validation.

These endpoints are the proposed API contract and may be refined during implementation.

⸻

13. Testing Strategy

Testing will be conducted at different levels.

Unit Testing

Test individual methods and services.

Examples:

* Account number generation.
* Deposit validation.
* Withdrawal validation.
* Interest calculations.
* Transfer validation.

Integration Testing

Test interactions between application components.

Examples:

* Spring Boot and MySQL integration.
* User registration and database persistence.
* Account creation and retrieval.
* Successful fund transfers.
* Transaction history retrieval.

API Testing

Use Postman to test:

* Authentication endpoints.
* Account endpoints.
* Deposit and withdrawal endpoints.
* Transfer endpoints.
* Administrator endpoints.

Frontend Testing

Verify:

* Registration and login forms.
* Navigation.
* Dashboard rendering.
* Transaction forms.
* API error handling.
* Responsive layout.

Essential Test Scenarios

Scenario	Expected Result
Valid deposit	Balance increases
Negative deposit	Transaction rejected
Valid withdrawal	Balance decreases
Withdrawal exceeding balance	Transaction rejected
Valid transfer	Both accounts update
Invalid recipient	Transfer rejected
Transfer to same account	Transfer rejected
Frozen account transaction	Transaction rejected
Unauthorized account access	Access denied
Successful login	Customer dashboard accessible

⸻

14. Project Development Milestones

The team will follow an incremental development approach.

Phase	Activities	Deliverable
Phase 1	Requirements, architecture and repository setup	Project foundation
Phase 2	Database design and backend configuration	Working database connection
Phase 3	Authentication and account management	Functional user and account modules
Phase 4	Deposits, withdrawals and transfers	Functional banking operations
Phase 5	React frontend integration	Working customer interface
Phase 6	Admin, interest and statements	Extended banking functionality
Phase 7	Testing, debugging and documentation	Integrated application
Phase 8	Final demonstration and submission	Completed project

⸻

15. Definition of Done

The project will be considered complete when:

* [ ]	Customers can register and authenticate.
* [ ]	Administrators can authenticate separately.
* [ ]	Customers can create and view accounts.
* [ ]	Deposits work correctly.
* [ ]	Withdrawals enforce balance restrictions.
* [ ]	Transfers update both accounts correctly.
* [ ]	Transaction records persist in MySQL.
* [ ]	Customers can access transaction histories.
* [ ]	Interest can be calculated and credited.
* [ ]	Account statements can be generated.
* [ ]	Administrators can monitor and manage accounts.
* [ ]	Protected routes and API endpoints enforce authorization.
* [ ]	The frontend and backend communicate successfully.
* [ ]	The application passes its essential tests.
* [ ]	Project documentation is complete.

⸻

16. Academic Learning Outcomes

Through this project, team members will gain practical experience in:

* Java object-oriented programming.
* Classes, objects, inheritance, encapsulation and abstraction.
* Exception handling.
* Collections and data management.
* Spring Boot application development.
* REST API design and implementation.
* Relational database design.
* SQL and database relationships.
* Authentication and authorization.
* Frontend and backend integration.
* Software testing and debugging.
* Git-based collaborative development.
* Application architecture and technical documentation.

⸻

17. Contributors

This project is developed collaboratively by seven students as part of a Java Programming course.

Member	Assigned Role	Name
1	Project Lead & Integration	To be assigned
2	Authentication & Security	To be assigned
3	Account Management	To be assigned
4	Banking Operations	To be assigned
5	Interest & Statements	To be assigned
6	Frontend Development	To be assigned
7	Administration, Database & Testing	To be assigned

⸻

18. License and Disclaimer

This project is developed strictly for educational purposes as part of a Java Programming course.

It is a simulated banking application and is not intended for actual financial transactions or commercial banking operations.

⸻

Built with Java. Designed for learning. Developed together.