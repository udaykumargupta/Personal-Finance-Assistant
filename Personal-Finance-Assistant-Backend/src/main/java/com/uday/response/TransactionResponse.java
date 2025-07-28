package com.uday.response;

import com.uday.domain.TransactionType;
import com.uday.model.Transaction;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
public class TransactionResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private BigDecimal amount;
    private TransactionType type;
    private LocalDate date;
    private String category;

    // Static factory method for easy conversion from Entity to DTO
    public static TransactionResponse fromTransaction(Transaction transaction) {
        TransactionResponse response = new TransactionResponse();
        response.setId(transaction.getId());
        response.setDescription(transaction.getDescription());
        response.setAmount(transaction.getAmount());
        response.setType(transaction.getType());
        response.setDate(transaction.getDate());
        response.setCategory(transaction.getCategory());
        return response;
    }
}
