package com.uday.repository;

import com.uday.model.Transaction;
import com.uday.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Custom query to find all transactions for a specific user
    List<Transaction> findByUser(User user);
}
