package com.namtechie.org.service;

import com.namtechie.org.entity.ServiceType;
import com.namtechie.org.repository.ServiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ServiceTypesService {

    @Autowired
    ServiceTypeRepository serviceTypeRepository;

    public List<ServiceType> findAll(){
        return serviceTypeRepository.findAll();
    }
}
