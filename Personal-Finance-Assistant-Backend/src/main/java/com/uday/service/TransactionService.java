package com.uday.service;

import com.uday.request.TransactionRequest;
import com.uday.response.TransactionResponse;

import java.util.List;

public interface TransactionService {
    TransactionResponse createTransaction(TransactionRequest request, String username);
    List<TransactionResponse> getTransactionsForUser(String username);
}
