package com.examly.springapp.repo;

import com.examly.springapp.model.AppointmentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// serves as a DAO (Data Access Object) component and provides methods for interacting with the underlying data source, such as a database.
@Repository

//interface extends the JpaRepository interface, which provides built-in methods for CRUD (Create, Read, Update, Delete) operations on the AppointmentInfo entity.
public interface AppointmentInfoRepository extends JpaRepository<AppointmentInfo,Long> {
}
