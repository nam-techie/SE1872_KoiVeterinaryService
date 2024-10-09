//package com.example.org.test;
//
//import static org.mockito.Mockito.*;
//import static org.junit.jupiter.api.Assertions.*;
//
//import com.example.org.entity.Appointment;
//import com.example.org.entity.VeterianSchedule;
//import com.example.org.model.ScheduleRequest;
//import com.example.org.repository.AppointmentRepository;
//import com.example.org.repository.VeterianScheduleRepository;
//import com.example.org.repository.ServiceTypeRepository;
//import com.example.org.repository.ZoneRepository;
//import com.example.org.service.AppointmentService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.sql.Date;
//import java.sql.Time;
//import java.time.DayOfWeek;
//import java.util.*;
//
//class AppointmentServiceTest {
//
//    @Mock
//    private ServiceTypeRepository serviceTypeRepository;
//
//    @Mock
//    private ZoneRepository zoneRepository;
//
//    @Mock
//    private VeterianScheduleRepository veterianScheduleRepository;
//
//    @Mock
//    private AppointmentRepository appointmentRepository;
//
//    @InjectMocks
//    private AppointmentService appointmentService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testFindFreeScheduleByVeterianId() {
//        Long veterianId = 1L;
//        Date date = Date.valueOf("2024-10-10");
//        Time startTimeMorning = Time.valueOf("07:00:00");
//        Time endTimeMorning = Time.valueOf("12:00:00");
//        Time startTimeAfternoon = Time.valueOf("13:00:00");
//        Time endTimeAfternoon = Time.valueOf("16:00:00");
//
//        // Mock dữ liệu cho VeterianSchedule
//        VeterianSchedule morningSchedule = new VeterianSchedule();
//        morningSchedule.setStartTime(startTimeMorning);
//        VeterianSchedule afternoonSchedule = new VeterianSchedule();
//        afternoonSchedule.setStartTime(startTimeAfternoon);
//
//        // Trả về lịch làm việc giả lập
//        when(veterianScheduleRepository.findVeterianScheduleByVeterianIdAndWorkDay(anyLong(), anyString()))
//                .thenReturn(Arrays.asList(morningSchedule, afternoonSchedule));
//
//        // Mock không có cuộc hẹn nào (lịch trống)
//        when(appointmentRepository.findAppointmentsByVeterianIdAndBookingDate(anyLong(), any(Date.class)))
//                .thenReturn(Collections.emptyList());
//
//        Map<Date, List<ScheduleRequest>> freeSchedules = appointmentService.findFreeScheduleByVeterianId(veterianId);
//
//        // Kiểm tra kết quả trả về
//        assertNotNull(freeSchedules);
//        assertEquals(2, freeSchedules.get(date).size()); // Kiểm tra số lượng lịch sáng và chiều
//        assertTrue(freeSchedules.get(date).get(0).isAvailable()); // Kiểm tra lịch buổi sáng
//        assertTrue(freeSchedules.get(date).get(1).isAvailable()); // Kiểm tra lịch buổi chiều
//    }
//}
//
