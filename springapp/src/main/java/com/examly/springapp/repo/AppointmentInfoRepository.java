package com.examly.springapp.repo;

import com.examly.springapp.model.AppointmentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentInfoRepository extends JpaRepository<AppointmentInfo,Long> {
}
