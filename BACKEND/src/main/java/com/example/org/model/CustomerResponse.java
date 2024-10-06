package com.example.org.model;

import lombok.Data;

@Data
public class CustomerResponse { // Chua su dung
    private long id;
    private long accountId;
    private String fullName;
    private boolean sex;
    private String phone;
}
