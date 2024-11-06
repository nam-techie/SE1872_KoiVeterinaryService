package com.namtechie.org;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.entity.AppointmentStatus;
import com.namtechie.org.entity.Payment;
import com.namtechie.org.entity.ServiceType;
import com.namtechie.org.repository.AppointmentRepository;
import com.namtechie.org.repository.AppointmentStatusRepository;
import com.namtechie.org.repository.PaymentRepository;
import com.namtechie.org.service.AppointmentService;
import com.namtechie.org.service.PaymentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

@SpringBootTest
public class AppointmentServiceTest {

    @Mock
    private AppointmentStatusRepository appointmentStatusRepository;

    @Mock
    private AppointmentRepository appointmentRepository;

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private PaymentService paymentService;

    @InjectMocks
    private AppointmentService appointmentService;

    private Appointment appointment;
    private ServiceType serviceType;
    private AppointmentStatus appointmentStatus;
    private Payment payment;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        serviceType = new ServiceType();
        serviceType.setBase_price(1000);
        serviceType.setName("Tư vấn trực tuyến");

        appointment = new Appointment();
        appointment.setId(1L);
        appointment.setServiceType(serviceType);

        appointmentStatus = new AppointmentStatus();
        appointmentStatus.setAppointment(appointment);
        appointmentStatus.setStatus("Đã xác nhận");
        appointmentStatus.setNotes("Bác sĩ chấp nhận");

        payment = new Payment();
        payment.setAppointment(appointment);
        payment.setTotalFee(serviceType.getBase_price());
    }

    // Happy Case - Xác nhận cuộc hẹn thành công
    @Test
    public void confirmDoctorAppointment_Successful() {
        when(appointmentRepository.findAppointmentById(1L)).thenReturn(appointment);
        when(appointmentStatusRepository.findByAppointmentId(1L)).thenReturn(appointmentStatus);
        when(paymentRepository.findByAppointmentId(1L)).thenReturn(null);  // Giả sử chưa có Payment
        when(paymentRepository.save(any(Payment.class))).thenReturn(payment);
        when(appointmentStatusRepository.save(any(AppointmentStatus.class))).thenReturn(appointmentStatus);

        AppointmentStatus result = appointmentService.confirmDoctorAppointment(1L);

        assertNotNull(result);
        assertEquals("Đã xác nhận", result.getStatus());
        assertEquals("Bác sĩ chấp nhận", result.getNotes());

        // Kiểm tra xem phương thức generateTransactionRecords được gọi với đúng tham số
        verify(paymentService, times(1)).generateTransactionRecords(1L, payment, serviceType.getBase_price(), serviceType.getName());
    }

    // Unhappy Case - Không tìm thấy loại dịch vụ cho cuộc hẹn
    @Test
    public void confirmDoctorAppointment_ServiceTypeNotFound_ThrowsException() {
        Appointment appointmentWithoutServiceType = new Appointment();
        appointmentWithoutServiceType.setId(1L);

        when(appointmentRepository.findAppointmentById(1L)).thenReturn(appointmentWithoutServiceType);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> appointmentService.confirmDoctorAppointment(1L));

        assertTrue(exception.getCause() instanceof IllegalArgumentException);
        assertEquals("Không tìm thấy loại dịch vụ cho cuộc hẹn với ID: 1", exception.getCause().getMessage());
    }

}
