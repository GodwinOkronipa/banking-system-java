package com.bank.repository;

import com.bank.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findByAccountId(Long accountId, Pageable pageable);
    List<Transaction> findByAccountIdAndCreatedAtBetween(Long accountId, LocalDateTime start, LocalDateTime end);
    List<Transaction> findByReference(String reference);
}
