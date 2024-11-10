package com.namtechie.org.service;

import com.namtechie.org.entity.Zone;
import com.namtechie.org.repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ZoneService {

    @Autowired
    private ZoneRepository zoneRepository;

    public List<Zone> findAll() {
        return zoneRepository.findAll();
    }

}
