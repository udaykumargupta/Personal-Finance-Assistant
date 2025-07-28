package com.uday.model;

import com.uday.domain.VerificationType;
import lombok.Data;

@Data
public class TwoFactorAuth {

    private boolean isEnabled=false;

    private VerificationType sendTo;
}
