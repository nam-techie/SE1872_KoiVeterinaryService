package com.namtechie.org.model.request;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
public class ZoneRequest {
    String name;
    long fee;
}
