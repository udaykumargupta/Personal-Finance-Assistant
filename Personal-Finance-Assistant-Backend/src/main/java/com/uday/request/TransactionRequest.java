package com.uday.request;

import com.uday.domain.TransactionType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TransactionRequest {

    @NotBlank(message = "Description is mandatory")
    private String description;

    @NotNull(message = "Amount is mandatory")
    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private BigDecimal amount;

    @NotNull(message = "Type is mandatory")
    private TransactionType type;

    @NotNull(message = "Date is mandatory")
    private LocalDate date;

    private String category;
}
