package com.namtechie.org.service;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.entity.FeedBack;
import com.namtechie.org.model.FeedbackRequest;
import com.namtechie.org.repository.AppointmentRepository;
import com.namtechie.org.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class FeedbackService {
    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    FeedbackRepository feedbackRepository;
    public FeedBack  createFeedbackService(FeedbackRequest feedbackRequest) {
        try{
            Appointment appointment = appointmentRepository.findAppointmentById(feedbackRequest.getAppointmentId());
            FeedBack feedBacks = new FeedBack();
            feedBacks.setRating(feedbackRequest.getRating());
            feedBacks.setComment(feedbackRequest.getComment());
            feedBacks.setAppointment(appointment);
            return feedbackRepository.save(feedBacks);

        } catch (Exception e) {
            throw new RuntimeException("Failed to create feedback");
        }
    }

//    public List<FeedBack> getFeedback() {
//        return feedbackRepository.findAll();
//    }
}