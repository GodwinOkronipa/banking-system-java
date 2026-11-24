package com.bank.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class TransactionDTO {

    public static class DepositRequest {
        @NotNull(message = "Account ID is required")
        private Long accountId;

        @NotNull(message = "Amount is required")
        @DecimalMin(value = "0.01", message = "Deposit amount must be greater than zero")
        private BigDecimal amount;

        private String description;

        public Long getAccountId() { return accountId; }
        public void setAccountId(Long accountId) { this.accountId = accountId; }
        public BigDecimal getAmount() { return amount; }
        public void setAmount(BigDecimal amount) { this.amount = amount; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    public static class WithdrawalRequest {
        @NotNull(message = "Account ID is required")
        private Long accountId;

        @NotNull(message = "Amount is required")
        @DecimalMin(value = "0.01", message = "Withdrawal amount must be greater than zero")
        private BigDecimal amount;

        private String description;

        public Long getAccountId() { return accountId; }
        public void setAccountId(Long accountId) { this.accountId = accountId; }
        public BigDecimal getAmount() { return amount; }
        public void setAmount(BigDecimal amount) { this.amount = amount; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    public static class TransferRequest {
        @NotNull(message = "Source Account ID is required")
        private Long sourceAccountId;

        @NotBlank(message = "Destination Account Number is required")
        private String destinationAccountNumber;

        @NotNull(message = "Amount is required")
        @DecimalMin(value = "0.01", message = "Transfer amount must be greater than zero")
        private BigDecimal amount;

        private String description;

        public Long getSourceAccountId() { return sourceAccountId; }
        public void setSourceAccountId(Long sourceAccountId) { this.sourceAccountId = sourceAccountId; }
        public String getDestinationAccountNumber() { return destinationAccountNumber; }
        public void setDestinationAccountNumber(String destinationAccountNumber) { this.destinationAccountNumber = destinationAccountNumber; }
        public BigDecimal getAmount() { return amount; }
        public void setAmount(BigDecimal amount) { this.amount = amount; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
}
