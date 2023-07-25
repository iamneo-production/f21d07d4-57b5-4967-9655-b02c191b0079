package com.examly.springapp.controller;

import com.examly.springapp.model.AppointmentInfo;

import com.examly.springapp.model.Center;
import com.examly.springapp.repo.CenterRepository;
import com.examly.springapp.service.AppointmentInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

//This class is a Spring @RestController, which means it handles incoming HTTP requests and generates HTTP responses using Spring's RESTful support.
@RestController

//This allows cross-origin requests from "http://localhost:3000", making it accessible from a frontend application running on this domain.
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {
    // he class uses Spring's dependency injection (@Autowired) to inject the AppointmentInfoService, which is a service class responsible for handling appointments. 
    // It is used to manage appointments by calling methods of the service.
    @Autowired
    private AppointmentInfoService appointmentInfoService;

    // The class defines various methods annotated with @PostMapping, @GetMapping, @PutMapping, and @DeleteMapping annotations, 
    // corresponding to different HTTP methods for booking, retrieving, updating, and deleting appointments, respectively.
    @PostMapping("/bookappointment")
    public AppointmentInfo addAppointment(@RequestBody AppointmentInfo appointmentInfo) {
        return this.appointmentInfoService.addAppointment(appointmentInfo);

    }

    // Return all appointments details
    @GetMapping("/admin/appointment")
    public List<AppointmentInfo> getAppointments() {
        return this.appointmentInfoService.allAppointments();
    }

    // Return all appointments details by UserId
    @GetMapping("/admin/appointment/{id}")
    public List<AppointmentInfo> getUserAppointments(@PathVariable String id) {
        long Id = Long.parseLong(id);
        return this.appointmentInfoService.getAppointmentByUserId(Id);
    }

    // updating Service Center
    @PutMapping(value = "/editAppointment/{id}")
    public AppointmentInfo editAppointment(@RequestBody AppointmentInfo appointmentInfo,
            @PathVariable("id") String id) {
        return this.appointmentInfoService.editAppointment(appointmentInfo, id);
    }

    // Updating Payment Status
    @PutMapping("/payment/{id}")
    public AppointmentInfo editPayment(@PathVariable String id) {
        return this.appointmentInfoService.editPayment(Long.parseLong(id));
    }

    // delete Service Center
    @DeleteMapping("/deleteAppointment/{id}")

    //Handles HTTP DELETE requests to delete an appointment. It takes the appointment id as a path variable and calls the deleteAppointment method 
    // of the AppointmentInfoService to delete the appointment.
    public String deleteAppointment(@PathVariable String id) throws ParseException {
        String data = "No data found";
        List<AppointmentInfo> appointmentinfo = getAppointments();
        AppointmentInfo appointmentInfo = new AppointmentInfo();
        for (AppointmentInfo x : appointmentinfo) {
            if (x.getAppointmentId() == Long.parseLong(id)) {
                appointmentInfo = x;

                SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd");
                Date d1 = sdformat.parse(String.valueOf(LocalDate.now()));
                Date d2 = sdformat.parse(x.getBookingDate());
                if((d1.compareTo(d2)==0 && x.getPaymentDone().equals("no")) || (d1.compareTo(d2)>0 && x.getPaymentDone().equals("no"))){
                    data = "You can't Delete";
                }else {
                    this.appointmentInfoService.deleteAppointment(Long.parseLong(id));
                    data = "Deleted Successfully";
                }
            }
        }

        return data;
    }
}
