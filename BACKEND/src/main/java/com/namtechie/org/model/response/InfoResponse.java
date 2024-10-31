package com.namtechie.org.model.response;

import lombok.Data;

import java.util.List;

@Data
public class InfoResponse {
    InfoCusResponse infoCusResponse;
    InfoKoiResponse infoKoiResponse;
    InfoAppointmentResponse infoAppointmentResponse;
    String status;
    List<InfoServiceTypeResponse> infoServiceTypeResponse;
    InfoFeedbackResponse infoFeedbackResponse;
}
