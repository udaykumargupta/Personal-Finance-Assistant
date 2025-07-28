package com.uday.service;

import com.uday.request.TransactionRequest;
import com.uday.response.ExpenseByCategoryResponse;
import com.uday.response.TransactionResponse;
import com.uday.response.TransactionSummaryByDateResponse;

import java.time.LocalDate;
import java.util.List;

public interface TransactionService {
    TransactionResponse createTransaction(TransactionRequest request, String username);

    // Method to get akk transactions
    //    List<TransactionResponse> getTransactionsForUser(String username);
    // Method to get transactions within a date range
    //    List<TransactionResponse> getTransactionsForUserByDateRange(String username, LocalDate startDate, LocalDate endDate);

    //    more powerful method that can handle all filtering combinations instead of above two.
    List<TransactionResponse> getTransactions(String username, LocalDate startDate, LocalDate endDate, String category);
    //  Method to get the expense summary by category.
    List<ExpenseByCategoryResponse> getExpenseSummaryByCategory(String username, LocalDate startDate, LocalDate endDate);

    //  Method for income summary by category
    List<ExpenseByCategoryResponse> getIncomeSummaryByCategory(String username, LocalDate startDate, LocalDate endDate);

    //methods for date-based summaries
    List<TransactionSummaryByDateResponse> getExpenseSummaryByDate(String username);
    List<TransactionSummaryByDateResponse> getIncomeSummaryByDate(String username);
}