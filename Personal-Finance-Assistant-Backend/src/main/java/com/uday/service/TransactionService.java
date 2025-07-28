package com.uday.service;

import com.uday.request.TransactionRequest;
import com.uday.response.ExpenseByCategoryResponse;
import com.uday.response.TransactionResponse;

import java.time.LocalDate;
import java.util.List;

public interface TransactionService {
    TransactionResponse createTransaction(TransactionRequest request, String username);
    List<TransactionResponse> getTransactionsForUser(String username);

    // Method to get transactions within a date range
    List<TransactionResponse> getTransactionsForUserByDateRange(String username, LocalDate startDate, LocalDate endDate);

    //  Method to get the expense summary.
    List<ExpenseByCategoryResponse> getExpenseSummaryByCategory(String username);

}
