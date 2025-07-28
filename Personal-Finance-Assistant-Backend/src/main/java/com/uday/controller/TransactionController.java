package com.uday.controller;

import com.uday.request.TransactionRequest;
import com.uday.response.TransactionResponse;
import com.uday.service.ReceiptService;
import com.uday.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private ReceiptService receiptService;

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
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) String category) { // NEW category parameter

        String username = authentication.getName();


        List<TransactionResponse> transactions = transactionService.getTransactions(username, startDate, endDate, category);

        return ResponseEntity.ok(transactions);
    }
    @PostMapping("/upload-receipt")
    public ResponseEntity<TransactionResponse> uploadReceipt(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        String username = authentication.getName();
        try {
            TransactionResponse transactionResponse = receiptService.processReceipt(file, username);
            return new ResponseEntity<>(transactionResponse, HttpStatus.CREATED);
        } catch (IOException e) {
            // A simple error handler for file processing issues.
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
