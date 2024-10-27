package com.namtechie.org.service;

import com.namtechie.org.entity.ServiceType;
import com.namtechie.org.exception.DuplicateEntity;
import com.namtechie.org.model.request.ServiceRequest;
import com.namtechie.org.repository.ServiceTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ServiceTypesService {

    @Autowired
    ServiceTypeRepository serviceTypeRepository;

    public List<ServiceType> findAll() {
        return serviceTypeRepository.findAll();
    }

    public void deleteService(long serviceId) {
        // Kiểm tra xem tài khoản có tồn tại hay không trước khi xóa
        if (serviceTypeRepository.existsById(serviceId)) {
            serviceTypeRepository.updateIsDeletedByServiceTypeId(true, serviceId);
        } else {
            throw new EntityNotFoundException("Không thể thực hiện thao tác này!!!");
        }
    }

    public void restoreService(long serviceId) {
        // Kiểm tra xem tài khoản có tồn tại hay không trước khi xóa
        if (serviceTypeRepository.existsById(serviceId)) {
            serviceTypeRepository.updateIsDeletedByServiceTypeId(false, serviceId);
        } else {
            throw new EntityNotFoundException("Không thể thực hiện thao tác này!!!");
        }
    }

    public void editService(long serviceId, ServiceRequest serviceRequest) {
        // Kiểm tra name, description và base_price có hợp lệ không
        if (serviceRequest.getName() == null || serviceRequest.getName().isEmpty()) {
            throw new RuntimeException("Tên dịch vụ không được để trống!");
        }

        if (serviceRequest.getDescription() == null || serviceRequest.getDescription().isEmpty()) {
            throw new RuntimeException("Mô tả dịch vụ không được để trống!");
        }

        if (serviceRequest.getBase_price() <= 0) {
            throw new RuntimeException("Giá dịch vụ phải lớn hơn 0!");
        }

        // Kiểm tra xem tên dịch vụ đã tồn tại chưa
        ServiceType existingService = serviceTypeRepository.findById(serviceId);
        if (serviceRequest.getName().equals(existingService.getName())) {
            existingService.setBase_price(serviceRequest.getBase_price());
            existingService.setDescription(serviceRequest.getDescription());
        } else {
            // Nếu tên khác, kiểm tra xem có tên dịch vụ nào khác trùng không
            if (serviceTypeRepository.existsByName(serviceRequest.getName())) {
                throw new DuplicateEntity("Đã có dịch vụ với tên này!!!");
            }
            // Cập nhật tất cả thông tin bao gồm tên
            existingService.setName(serviceRequest.getName());
            existingService.setDescription(serviceRequest.getDescription());
            existingService.setBase_price(serviceRequest.getBase_price());
        }
        serviceTypeRepository.save(existingService);
    }

    public void addService(ServiceRequest serviceRequest) {
        // Kiểm tra ServiceRequest có null không
        if (serviceRequest == null) {
            throw new RuntimeException("Yêu cầu dịch vụ không được để trống!");
        }

        // Kiểm tra name, description và base_price có hợp lệ không
        if (serviceRequest.getName() == null || serviceRequest.getName().isEmpty()) {
            throw new RuntimeException("Tên dịch vụ không được để trống!");
        }

        if (serviceRequest.getDescription() == null || serviceRequest.getDescription().isEmpty()) {
            throw new RuntimeException("Mô tả dịch vụ không được để trống!");
        }

        if (serviceRequest.getBase_price() <= 0) {
            throw new RuntimeException("Giá dịch vụ phải lớn hơn 0!");
        }

        // Kiểm tra xem tên dịch vụ đã tồn tại chưa
        boolean exists = serviceTypeRepository.existsByName(serviceRequest.getName());
        if (exists) {
            throw new DuplicateEntity("Đã có dịch vụ này!!!");
        }

        // Tạo một đối tượng ServiceType mới từ ServiceRequest
        ServiceType newService = new ServiceType();
        newService.setName(serviceRequest.getName());
        newService.setDescription(serviceRequest.getDescription());
        newService.setBase_price(serviceRequest.getBase_price());

        // Lưu vào repository
        serviceTypeRepository.save(newService);
    }


}
