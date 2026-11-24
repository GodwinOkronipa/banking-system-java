-- V1 Initial Schema Creation for Banking System

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_CUSTOMER',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    account_type VARCHAR(20) NOT NULL,
    balance DECIMAL(19, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_accounts_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT NOT NULL,
    related_account_id BIGINT NULL,
    transaction_type VARCHAR(20) NOT NULL,
    amount DECIMAL(19, 2) NOT NULL,
    balance_before DECIMAL(19, 2) NOT NULL,
    balance_after DECIMAL(19, 2) NOT NULL,
    reference VARCHAR(64) NOT NULL,
    description VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_trans_account FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE RESTRICT,
    CONSTRAINT fk_trans_rel_account FOREIGN KEY (related_account_id) REFERENCES accounts (id) ON DELETE RESTRICT
);

CREATE INDEX idx_trans_account_id ON transactions (account_id);
CREATE INDEX idx_trans_reference ON transactions (reference);

CREATE TABLE IF NOT EXISTS interest_rates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_type VARCHAR(20) NOT NULL,
    annual_rate DECIMAL(8, 5) NOT NULL,
    effective_from DATE NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);
