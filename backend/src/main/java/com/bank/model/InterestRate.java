package com.bank.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "interest_rates")
public class InterestRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_type", nullable = false, length = 20)
    private AccountType accountType;

    @Column(name = "annual_rate", nullable = false, precision = 8, scale = 5)
    private BigDecimal annualRate;

    @Column(name = "effective_from", nullable = false)
    private LocalDate effectiveFrom;

    @Column(nullable = false)
    private Boolean active = true;

    public InterestRate() {}

    public InterestRate(AccountType accountType, BigDecimal annualRate, LocalDate effectiveFrom, Boolean active) {
        this.accountType = accountType;
        this.annualRate = annualRate;
        this.effectiveFrom = effectiveFrom;
        this.active = active != null ? active : true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public AccountType getAccountType() { return accountType; }
    public void setAccountType(AccountType accountType) { this.accountType = accountType; }

    public BigDecimal getAnnualRate() { return annualRate; }
    public void setAnnualRate(BigDecimal annualRate) { this.annualRate = annualRate; }

    public LocalDate getEffectiveFrom() { return effectiveFrom; }
    public void setEffectiveFrom(LocalDate effectiveFrom) { this.effectiveFrom = effectiveFrom; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
