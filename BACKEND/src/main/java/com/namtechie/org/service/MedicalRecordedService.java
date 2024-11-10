package com.namtechie.org.service;

import com.namtechie.org.entity.MedicalRecorded;
import com.namtechie.org.model.request.FishRequest;
import com.namtechie.org.model.response.FishResponse;
import com.namtechie.org.repository.MedicalRecordedRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicalRecordedService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MedicalRecordedRepository medicalRecordedRepository;

    public List<FishResponse> findAllFish() {
        // Lấy tất cả MedicalRecorded từ repository
        List<MedicalRecorded> listFish = medicalRecordedRepository.findAll();

        // Ánh xạ từ MedicalRecorded sang FishResponse
        return listFish.stream()
                .map(fish -> modelMapper.map(fish, FishResponse.class))
                .collect(Collectors.toList());
    }

    public void updateInfoFish(FishRequest fishRequest) {
        if (medicalRecordedRepository.existsByAppointmentId(fishRequest.getAppointmentId())) {
            MedicalRecorded updateInfo = medicalRecordedRepository.findMedicalRecordedByAppointmentId(fishRequest.getAppointmentId());
            updateInfo.setName(fishRequest.getName());
            updateInfo.setBreed(fishRequest.getBreed());
            updateInfo.setAge(fishRequest.getAge());
            updateInfo.setColor(fishRequest.getColor());
            updateInfo.setWeight(fishRequest.getWeight());
            updateInfo.setHealthStatus(fishRequest.getHealthStatus());
            medicalRecordedRepository.save(updateInfo);
        } else {
            throw new EntityNotFoundException("Không thể thực hiện thao tác này!!!");
        }

    }


}
