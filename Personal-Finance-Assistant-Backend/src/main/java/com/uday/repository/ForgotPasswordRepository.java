package com.uday.repository;

import com.uday.model.ForgotPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPasswordToken,String> {

    ForgotPasswordToken findByUserId(Long userId);
    ForgotPasswordToken findByOtp(String otp);
}