package com.uday.service;

import com.uday.model.TwoFactorOtp;
import com.uday.model.User;

public interface TwoFactorOtpService {

    TwoFactorOtp createTwoFactorOtp(User user,String otp,String jwt);

    TwoFactorOtp findByUser(Long userId);

    TwoFactorOtp findById(String id);

    boolean verifyTwoFactorOtp(TwoFactorOtp twoFactorOtp,String otp);

    void deleteTwoFactorOtp(TwoFactorOtp twoFactorOtp);
}