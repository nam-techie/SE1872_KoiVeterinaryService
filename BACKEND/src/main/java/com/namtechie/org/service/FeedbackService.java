package com.namtechie.org.service;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.entity.AppointmentStatus;
import com.namtechie.org.entity.FeedBack;
import com.namtechie.org.model.request.FeedbackRequest;
import com.namtechie.org.model.response.FeedbackResponse;
import com.namtechie.org.repository.AppointmentRepository;
import com.namtechie.org.repository.AppointmentStatusRepository;
import com.namtechie.org.repository.FeedbackRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FeedbackService {
    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    AppointmentStatusRepository appointmentStatusRepository;

    public FeedBack createFeedbackService(long appointmentId,FeedbackRequest feedbackRequest) {
        try {
            Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
            FeedBack feedBacks = new FeedBack();
            feedBacks.setRating(feedbackRequest.getRating());
            feedBacks.setComment(feedbackRequest.getComment());
            feedBacks.setAppointment(appointment);

            AppointmentStatus appointmentStatus = new AppointmentStatus();
            appointmentStatus.setNotes("Khách hàng feedback dịch vụ.");
            appointmentStatus.setStatus("Đã đánh giá");
            appointmentStatus.setAppointment(appointment);
            appointmentStatusRepository.save(appointmentStatus);

            return feedbackRepository.save(feedBacks);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create feedback");
        }
    }

    public List<FeedBack> getFeedback() {
        return feedbackRepository.findAll();
    }

    public FeedBack getFeedbackCustomer(long appointmentId) {
        return feedbackRepository.findByAppointmentId(appointmentId);
    }

    public void deleteFeedback(long feedbackId) {
        // Kiểm tra xem tài khoản có tồn tại hay không trước khi xóa
        if (feedbackRepository.existsById(feedbackId)) {
            feedbackRepository.updateIsDeletedByFeedbackId(true, feedbackId);
        } else {
            throw new EntityNotFoundException("Không thể thực hiện thao tác này!!!");
        }
    }

    public void restoreFeedback(long feedbackId) {
        // Kiểm tra xem tài khoản có tồn tại hay không trước khi xóa
        if (feedbackRepository.existsById(feedbackId)) {
            feedbackRepository.updateIsDeletedByFeedbackId(false, feedbackId);
        } else {
            throw new EntityNotFoundException("Không thể thực hiện thao tác này!!!");
        }
    }
}
