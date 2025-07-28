package com.uday.response;

import jakarta.persistence.Entity;
import lombok.Data;

import java.math.BigDecimal;


//  DTO to hold the sum of transactions for a specific category.
@Data
public class ExpenseByCategoryResponse {
    private String category;
    private BigDecimal totalAmount;

    public ExpenseByCategoryResponse(String category, BigDecimal totalAmount) {
        this.category = category;
        this.totalAmount = totalAmount;
    }

}
