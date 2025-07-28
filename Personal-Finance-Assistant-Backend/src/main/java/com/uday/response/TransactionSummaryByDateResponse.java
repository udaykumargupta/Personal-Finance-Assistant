package com.uday.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;


//  DTO to hold the sum of transactions for a specific date.

@Data
public class TransactionSummaryByDateResponse {
    private LocalDate date;
    private BigDecimal totalAmount;

    public TransactionSummaryByDateResponse(LocalDate date, BigDecimal totalAmount) {
        this.date = date;
        this.totalAmount = totalAmount;
    }
}
