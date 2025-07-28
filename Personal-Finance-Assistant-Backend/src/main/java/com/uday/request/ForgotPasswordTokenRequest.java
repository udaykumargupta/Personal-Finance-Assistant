package com.uday.request;

import com.uday.domain.VerificationType;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
public class ForgotPasswordTokenRequest {
    private VerificationType verificationType;
    private String sendTo;
}