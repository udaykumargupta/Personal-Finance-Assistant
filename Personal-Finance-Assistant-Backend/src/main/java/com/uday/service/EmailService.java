package com.uday.service;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendVerificationOtpEmail(String email, String otp) throws MessagingException;
}