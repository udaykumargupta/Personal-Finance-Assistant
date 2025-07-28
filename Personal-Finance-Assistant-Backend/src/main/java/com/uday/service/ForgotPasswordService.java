package com.uday.service;

import com.uday.domain.VerificationType;
import com.uday.model.ForgotPasswordToken;
import com.uday.model.User;

public interface ForgotPasswordService {

    ForgotPasswordToken findByOtp(String otp);
    ForgotPasswordToken createToken(User user,
                                    String otp,
                                    VerificationType verificationType,
                                    String sendTo);

    ForgotPasswordToken findById(String id);

    ForgotPasswordToken findByUser(Long userId);

    void deleteToken(ForgotPasswordToken token);

}