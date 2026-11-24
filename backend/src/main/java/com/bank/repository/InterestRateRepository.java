package com.bank.repository;

import com.bank.model.AccountType;
import com.bank.model.InterestRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterestRateRepository extends JpaRepository<InterestRate, Long> {
    Optional<InterestRate> findTopByAccountTypeAndActiveTrueOrderByEffectiveFromDesc(AccountType accountType);
}
