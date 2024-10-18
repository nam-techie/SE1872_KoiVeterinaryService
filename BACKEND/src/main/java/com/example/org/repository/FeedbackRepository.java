package com.example.org.repository;

import com.example.org.entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<FeedBack, Long> {
}
