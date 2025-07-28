package com.uday.service;

import com.uday.model.TwoFactorOtp;
import com.uday.model.User;
import com.uday.repository.TwoFactorOtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TwoFactorOtpServiceImpl implements TwoFactorOtpService{

    @Autowired
    private TwoFactorOtpRepository twoFactorOtpRepository;

    @Override
    public TwoFactorOtp createTwoFactorOtp(User user, String otp, String jwt) {
        UUID uuid=UUID.randomUUID();

        String id=uuid.toString();
        TwoFactorOtp twoFactorOTP=new TwoFactorOtp();
        twoFactorOTP.setOtp(otp);
        twoFactorOTP.setJwt(jwt);
        twoFactorOTP.setId(id);
        twoFactorOTP.setUser(user);
        return twoFactorOtpRepository.save(twoFactorOTP);
    }

    @Override
    public TwoFactorOtp findByUser(Long userId) {

        return twoFactorOtpRepository.findByUserId(userId);
    }

    @Override
    public TwoFactorOtp findById(String id) {
        Optional<TwoFactorOtp> opt=twoFactorOtpRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public boolean verifyTwoFactorOtp(TwoFactorOtp twoFactorOTP, String otp) {
        return twoFactorOTP.getOtp().equals(otp);
    }

    @Override
    public void deleteTwoFactorOtp(TwoFactorOtp twoFactorOTP) {
        twoFactorOtpRepository.delete(twoFactorOTP);
    }
}