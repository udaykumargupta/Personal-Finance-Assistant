package com.uday.repository;

import com.uday.domain.TransactionType;
import com.uday.model.Transaction;
import com.uday.model.User;
import com.uday.response.ExpenseByCategoryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Custom query to find all transactions for a specific user
    List<Transaction> findByUser(User user);

    // Finds all transactions for a user between two dates (inclusive)
    List<Transaction> findByUserAndDateBetween(User user, LocalDate startDate, LocalDate endDate);

    // JPQL query to group transactions by category and sum their amounts.
    @Query("SELECT new com.uday.response.ExpenseByCategoryResponse(t.category, SUM(t.amount)) " +
            "FROM Transaction t " +
            "WHERE t.user = :user AND t.type = :transactionType " +
            "GROUP BY t.category")
    List<ExpenseByCategoryResponse> getSummaryByCategory(@Param("user") User user, @Param("transactionType") TransactionType transactionType);
}
