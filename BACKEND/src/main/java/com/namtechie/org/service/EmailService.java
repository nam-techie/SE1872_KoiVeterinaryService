package com.namtechie.org.service;

import com.namtechie.org.model.EmailConfirmDoctor;
import com.namtechie.org.model.EmailDetail;
import com.namtechie.org.model.EmailResetPass;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {
    @Autowired
    TemplateEngine templateEngine;

    @Autowired
    JavaMailSender javaMailSender;

    public void sendEmail(EmailDetail emailDetail) {
        try {
            Context context = new Context();
            context.setVariable("name", emailDetail.getReceiver().getEmail());
            context.setVariable("button", "Quay lại để đăng nhập!");
            context.setVariable("link", emailDetail.getLink());

            String template = templateEngine.process("welcome-template", context);

            // creating simple mail message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");

            // setting up necessary details
            mimeMessageHelper.setFrom("namdpse180259@fpt.edu.vn");
            mimeMessageHelper.setTo(emailDetail.getReceiver().getEmail());
            mimeMessageHelper.setText(template, true);
            mimeMessageHelper.setSubject(emailDetail.getSubject());

            // send Email
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.out.println("ERROR SENT MAIL!");
        }
    }

    public void resetPassword(EmailResetPass emailResetPass){

        try {
            // Tạo bối cảnh cho template
            Context context = new Context();
            context.setVariable("name", emailResetPass.getReceiver().getEmail());
            context.setVariable("otp", emailResetPass.getOtp());  // Truyền OTP vào email
            context.setVariable("link", emailResetPass.getLink());
            context.setVariable("button", "Nhập OTP và đặt lại mật khẩu");

            // Xử lý template 'reset-password' với bối cảnh đã thiết lập
            String template = templateEngine.process("reset-password", context);

            // Tạo MimeMessage để gửi email
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

            // Thiết lập các thông tin cần thiết cho email
            mimeMessageHelper.setFrom("namdpse180259@fpt.edu.vn");
            mimeMessageHelper.setTo(emailResetPass.getReceiver().getEmail());
            mimeMessageHelper.setText(template, true);  // Gửi email dạng HTML
            mimeMessageHelper.setSubject(emailResetPass.getSubject());

            // Gửi email
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            // Ghi lại lỗi nếu không gửi được email
            System.out.println("LỖI: Không thể gửi email!");
        }
    }


    public void sendAppointmentConfirmationEmail(EmailConfirmDoctor emailConfirmDoctor) {
        try {
            Context context = new Context();
            context.setVariable("name", emailConfirmDoctor.getReceiver().getEmail());
            context.setVariable("appointmentDate", emailConfirmDoctor.getAppointmentDate());
            context.setVariable("appointmentTime", emailConfirmDoctor.getAppointmentTime());
            context.setVariable("paymentLink", emailConfirmDoctor.getLink());


            String template = templateEngine.process("doctor-confirm", context);


            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");


            mimeMessageHelper.setFrom("namdpse180259@fpt.edu.vn");
            mimeMessageHelper.setTo(emailConfirmDoctor.getReceiver().getEmail());
            mimeMessageHelper.setText(template, true);
            mimeMessageHelper.setSubject("Xác nhận lịch hẹn và thanh toán tại Koi Kung Center");


            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.out.println("LỖI: Không thể gửi email!");
        }
    }


}

