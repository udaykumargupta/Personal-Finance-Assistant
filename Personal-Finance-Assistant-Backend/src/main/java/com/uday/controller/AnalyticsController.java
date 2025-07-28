package com.uday.controller;

import com.uday.request.TransactionRequest;
import com.uday.response.ExpenseByCategoryResponse;
import com.uday.response.TransactionResponse;
import com.uday.response.TransactionSummaryByDateResponse;
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
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/expenses/by-category")
    public ResponseEntity<List<ExpenseByCategoryResponse>> getExpensesByCategory(
            Authentication authentication,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        String username = authentication.getName();
        // Pass the date parameters to the service method
        List<ExpenseByCategoryResponse> summary = transactionService.getExpenseSummaryByCategory(username, startDate, endDate);
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/income/by-category")
    public ResponseEntity<List<ExpenseByCategoryResponse>> getIncomeByCategory(
            Authentication authentication,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        String username = authentication.getName();
        // Pass the date parameters to the service method
        List<ExpenseByCategoryResponse> summary = transactionService.getIncomeSummaryByCategory(username, startDate, endDate);
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/expenses/by-date")
    public ResponseEntity<List<TransactionSummaryByDateResponse>> getExpensesByDate(Authentication authentication) {
        String username = authentication.getName();
        List<TransactionSummaryByDateResponse> summary = transactionService.getExpenseSummaryByDate(username);
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/income/by-date")
    public ResponseEntity<List<TransactionSummaryByDateResponse>> getIncomeByDate(Authentication authentication) {
        String username = authentication.getName();
        List<TransactionSummaryByDateResponse> summary = transactionService.getIncomeSummaryByDate(username);
        return ResponseEntity.ok(summary);
    }
}
