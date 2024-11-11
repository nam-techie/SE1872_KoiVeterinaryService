package com.namtechie.org.model;


import com.namtechie.org.entity.Account;
import lombok.Data;


import java.sql.Date;
import java.sql.Time;


@Data
public class EmailConfirmDoctor {
    Account receiver;
    Date appointmentDate;
    Time appointmentTime;
    String link;
}
