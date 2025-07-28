package com.uday.controller;

import com.uday.response.ExpenseByCategoryResponse;
import com.uday.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/expenses/by-category")
    public ResponseEntity<List<ExpenseByCategoryResponse>> getExpensesByCategory(Authentication authentication) {
        String username = authentication.getName();
        List<ExpenseByCategoryResponse> summary = transactionService.getExpenseSummaryByCategory(username);
        return ResponseEntity.ok(summary);
    }
}
