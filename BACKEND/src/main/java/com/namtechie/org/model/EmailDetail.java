package com.namtechie.org.model;

import com.namtechie.org.entity.Account;
import lombok.Data;

@Data
public class EmailDetail {
    Account receiver;
    String subject;
    String link;
}
