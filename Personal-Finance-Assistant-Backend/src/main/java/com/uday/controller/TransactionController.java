package com.uday.controller;

import com.uday.request.TransactionRequest;
import com.uday.response.TransactionResponse;
import com.uday.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionResponse> createTransaction(
            @Valid @RequestBody TransactionRequest request,
            Authentication authentication) {

        String username = authentication.getName();
        TransactionResponse createdTransaction = transactionService.createTransaction(request, username);
        return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponse>> getUserTransactions(
            Authentication authentication,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        String username = authentication.getName();
        List<TransactionResponse> transactions;

        // If both dates are provided, filter by date range.
        // Otherwise, fetch all transactions.
        if (startDate != null && endDate != null) {
            transactions = transactionService.getTransactionsForUserByDateRange(username, startDate, endDate);
        } else {
            transactions = transactionService.getTransactionsForUser(username);
        }

        return ResponseEntity.ok(transactions);
    }
}
