package com.examly.springapp.service;

import com.examly.springapp.model.AppointmentInfo;
//import com.examly.springapp.model.Center;

import java.util.List;

// AppointmentInfoService interface declares several methods that define the contract for managing AppointmentInfo entities in the application. 
public interface AppointmentInfoService {
    AppointmentInfo addAppointment(AppointmentInfo appointmentInfo);

    List<AppointmentInfo> allAppointments();

    public AppointmentInfo editAppointment(AppointmentInfo appointmentInfo, String id);

    public AppointmentInfo deleteAppointment(long id);

    public List<AppointmentInfo> getAppointmentByUserId(long id);

    public AppointmentInfo editPayment(long id);
}
