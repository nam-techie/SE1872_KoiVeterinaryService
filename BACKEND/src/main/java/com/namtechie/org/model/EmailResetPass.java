package com.namtechie.org.model;

import com.namtechie.org.entity.Account;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmailResetPass {
    Account receiver;
    String subject;
    String link;
    String otp;
}

