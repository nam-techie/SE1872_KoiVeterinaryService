package com.namtechie.org.model.response;

import lombok.Data;
import lombok.NonNull;

import java.util.List;

@Data
@NonNull
public class InfoResponse {
    long appointmentId;
    InfoCusResponse infoCusResponse;
    InfoKoiResponse infoKoiResponse;
    InfoAppointmentResponse infoAppointmentResponse;
    String status;
    List<InfoServiceTypeResponse> infoServiceTypeResponse;
    long donePayment;
    long notDonePayment;
    long totalPayment;
    String transactionMethod;
    InfoFeedbackResponse infoFeedbackResponse;
}
