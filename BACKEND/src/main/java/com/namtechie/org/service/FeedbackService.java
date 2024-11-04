package com.namtechie.org.service;

import com.namtechie.org.entity.*;
import com.namtechie.org.model.request.FeedbackRequest;
import com.namtechie.org.model.response.FeedbackResponse;
import com.namtechie.org.repository.AppointmentRepository;
import com.namtechie.org.repository.AppointmentStatusRepository;
import com.namtechie.org.repository.DoctorRepository;
import com.namtechie.org.repository.FeedbackRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class FeedbackService {
    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    AppointmentStatusRepository appointmentStatusRepository;
    @Autowired
    private DoctorRepository doctorRepository;

    public FeedBack createFeedbackService(long appointmentId, FeedbackRequest feedbackRequest) {
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

    public List<FeedbackResponse> listTop4FeedbackOfDoctor(Account account) {
        List<FeedbackResponse> responses = new ArrayList<>();
        Doctor doctor = doctorRepository.findByAccountId(account.getId());

        // Lấy tất cả các phản hồi của các cuộc hẹn thuộc về bác sĩ
        List<Appointment> appointments = appointmentRepository.findByDoctorId(doctor.getId());
        for (Appointment appointment : appointments) {
            FeedBack feedback = appointment.getFeedBack();
            if (feedback != null) { // Chỉ thêm nếu feedback tồn tại
                FeedbackResponse feedbackResponse = new FeedbackResponse();
                Customers cus = appointment.getCustomers();
                feedbackResponse.setUsername(cus.getFullName());
                feedbackResponse.setRating(feedback.getRating());
                feedbackResponse.setComment(feedback.getComment());
                feedbackResponse.setCreated_date(feedback.getCreated_date());

                responses.add(feedbackResponse);
            }
        }

        // Sắp xếp danh sách phản hồi theo created_date giảm dần
        responses.sort((f1, f2) -> f2.getCreated_date().compareTo(f1.getCreated_date()));

        // Lấy 4 phản hồi mới nhất
        List<FeedbackResponse> top4Responses = responses.stream().limit(4).collect(Collectors.toList());

        // Nếu không đủ 4 phản hồi, thêm các phản hồi trống
        while (top4Responses.size() < 4) {
            top4Responses.add(new FeedbackResponse()); // Thêm phản hồi trống
        }

        return top4Responses;
    }


}
