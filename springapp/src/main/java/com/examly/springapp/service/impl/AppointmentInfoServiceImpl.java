package com.examly.springapp.service.impl;

import com.examly.springapp.controller.CenterController;
import com.examly.springapp.controller.UserController;
import com.examly.springapp.model.AppointmentInfo;
import com.examly.springapp.model.Center;
import com.examly.springapp.model.Users;
import com.examly.springapp.repo.AppointmentInfoRepository;
import com.examly.springapp.repo.CenterRepository;
import com.examly.springapp.repo.UserRepository;
import com.examly.springapp.service.AppointmentInfoService;
import com.examly.springapp.service.CenterService;
import com.examly.springapp.service.SlotService;
import com.examly.springapp.model.Slot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AppointmentInfoServiceImpl implements AppointmentInfoService {
    @Autowired
    private AppointmentInfoRepository appointmentInfoRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CenterService centerService;

    @Autowired
    private SlotService slotService;
    @Autowired
    private CenterRepository centerRepository;
    @Autowired
    private CenterController centerController;
    @Autowired
    private UserController userController;

    @Override
    //This method is responsible for adding a new AppointmentInfo entity to the application.
    // It first checks the availability of the time slot and updates the corresponding slot status accordingly.
    // It saves the appointment information and associates it with the corresponding service center and user entities.
    // The method returns the newly added AppointmentInfo entity.
    public AppointmentInfo addAppointment(AppointmentInfo appointmentInfo) {

        // adding Slot into appointmentInfo table
        System.out.println("Function execution started----------------------------");

        long centerId = appointmentInfo.getServiceCenterId();

        String slotTime = appointmentInfo.getBookingTime();

        String bookingDate = appointmentInfo.getBookingDate();

        Slot toUpdateSlot = findSlot(centerId, bookingDate);

        if (toUpdateSlot != null) {

            switch (slotTime) {

                case "10:00":
                    toUpdateSlot.setTen(false);
                    break;
                case "11:00":
                    toUpdateSlot.setEleven(false);
                    break;
                case "12:00":
                    toUpdateSlot.setTwelve(false);
                    break;
                case "13:00":
                    toUpdateSlot.setThirteen(false);
                    break;
                case "14:00":
                    toUpdateSlot.setFourteen(false);
                    break;
                case "15:00":
                    toUpdateSlot.setFifteen(false);
                    break;
                case "16:00":
                    toUpdateSlot.setSixteen(false);
                    break;
                case "17:00":
                    toUpdateSlot.setSeventeen(false);
                    break;
                case "18:00":
                    toUpdateSlot.setEighteen(false);
                    break;
                default:
                    System.out.println("\n\n***********None of the cases matched********\n\n");
            }

            System.out.println("Slot after change: " + toUpdateSlot);

            slotService.editSlot(toUpdateSlot);
        }

        System.out.println("Function execution done------------------------------------------");
        appointmentInfo.setPaymentDone("no");
        this.appointmentInfoRepository.save(appointmentInfo);

        // adding appointment into service center
        List<Center> centerList = centerController.viewServiceCenter();
        for (Center X : centerList) {
            if (Objects.equals(X.getServiceCenterId(), appointmentInfo.getServiceCenterId())) {
                X.getAppointmentInfo().add(appointmentInfo);
                this.centerRepository.save(X);
            }
        }
        // adding appointment into user
        List<Users> userList = userController.getUser();
        for (Users X : userList) {
            if (Objects.equals(X.getUserId(), appointmentInfo.getUserId())) {
                X.getAppointmentInfo().add(appointmentInfo);
                this.userRepository.save(X);
            }
        }
        return appointmentInfo;
    }

    @Override

    // This method retrieves a list of all AppointmentInfo entities from the application.
    // It returns a list containing all the appointments in the system.
    public List<AppointmentInfo> allAppointments() {    
        return this.appointmentInfoRepository.findAll();
    }

    @Override

    //    This method is responsible for updating an existing AppointmentInfo entity in the application.
    // It first finds the existing appointment using the given id.
    // It then checks the availability of the time slot and updates the corresponding slot status accordingly.
    // The method saves the updated appointment information and returns the updated AppointmentInfo entity.

    public AppointmentInfo editAppointment(AppointmentInfo appointmentInfo, String id) {

        Optional<AppointmentInfo> appointmentinfo = appointmentInfoRepository.findById(Long.parseLong(id));

        AppointmentInfo myAppointment = appointmentinfo.orElseThrow(() -> new RuntimeException("No such data found"));

        // setting previous slot to true again
        long centerId = myAppointment.getServiceCenterId();
        String bookingDate = myAppointment.getBookingDate();
        String bookingTime = myAppointment.getBookingTime();

        Slot slot = findSlot(centerId, bookingDate);

        Slot editedSlot = toEditSlot(slot, bookingTime, true);

        slotService.editSlot(editedSlot);

        // editing appointment information
        myAppointment.setProductName(appointmentInfo.getProductName());
        myAppointment.setPurchaseDate(appointmentInfo.getPurchaseDate());
        myAppointment.setProductModelNo(appointmentInfo.getProductModelNo());
        myAppointment.setProblemStatement(appointmentInfo.getProblemStatement());
        myAppointment.setBookingDate(appointmentInfo.getBookingDate());
        myAppointment.setBookingTime(appointmentInfo.getBookingTime());

        // setting new slot to false
        centerId = myAppointment.getServiceCenterId();
        bookingDate = myAppointment.getBookingDate();
        bookingTime = myAppointment.getBookingTime();

        slot = findSlot(centerId, bookingDate);

        editedSlot = toEditSlot(slot, bookingTime, false);

        slotService.editSlot(editedSlot);

        // saving new appointment information
        appointmentInfoRepository.save(myAppointment);

        return myAppointment;
    }

    @Override

    //    This method is responsible for deleting an existing AppointmentInfo entity from the application.
    // It first finds the existing appointment using the given id.
    // It then updates the corresponding slot status to make the time slot available again.
    // The method deletes the appointment from the database and returns the deleted AppointmentInfo entity.
    public AppointmentInfo deleteAppointment(long id) {


        //The deleteAppointment method in the AppointmentInfoServiceImpl class 
        // is responsible for deleting an existing appointment and making the corresponding time slot available again. 
        List<AppointmentInfo> appointmentinfo = allAppointments();

        AppointmentInfo appointmentInfo = new AppointmentInfo();
        for (AppointmentInfo x : appointmentinfo) {
            if (x.getAppointmentId() == id) {
                appointmentInfo = x;
                appointmentInfoRepository.delete(x);
            }
        }

        Long centerId = appointmentInfo.getServiceCenterId();
        String bookingDate = appointmentInfo.getBookingDate();
        String bookingTime = appointmentInfo.getBookingTime();

        Slot toDeleteSlot = findSlot(centerId, bookingDate);

        if (toDeleteSlot != null) {

            switch (bookingTime) {

                case "10:00":
                    toDeleteSlot.setTen(true);
                    break;
                case "11:00":
                    toDeleteSlot.setEleven(true);
                    break;
                case "12:00":
                    toDeleteSlot.setTwelve(true);
                    break;
                case "13:00":
                    toDeleteSlot.setThirteen(true);
                    break;
                case "14:00":
                    toDeleteSlot.setFourteen(true);
                    break;
                case "15:00":
                    toDeleteSlot.setFifteen(true);
                    break;
                case "16:00":
                    toDeleteSlot.setSixteen(true);
                    break;
                case "17:00":
                    toDeleteSlot.setSeventeen(true);
                    break;
                case "18:00":
                    toDeleteSlot.setEighteen(true);
                    break;
                default:
                    System.out.println("\n\n***********None of the cases matched********\n\n");
            }

            slotService.editSlot(toDeleteSlot);
        }

        return appointmentInfo;
    }

    @Override
    //his method retrieves a list of AppointmentInfo entities associated with a specific user.
// It takes a long parameter id, which represents the id of the user.
// The method returns a list containing all the appointments associated with the user.
    public List<AppointmentInfo> getAppointmentByUserId(long id) {

        List<Users> userList = userController.getUser();
        List<AppointmentInfo> appointmentInfoList = null;
        for (Users x : userList) {
            if (Objects.equals(id, x.getUserId())) {
                appointmentInfoList = x.getAppointmentInfo();
            }
        }
        return appointmentInfoList;
    }

    //findSlot method in the AppointmentInfoServiceImpl class is responsible for finding the time slot associated with a given service center and booking date.
    public Slot findSlot(long centerId, String bookingDate) {

        Center center = centerService.getCenter(centerId);

        List<Slot> slotList = center.getSlots();

        Slot requiredSlot = null;

        for (Slot slot : slotList) {
            if (slot.getDate().equals(bookingDate)) {
                requiredSlot = slot;
            }
        }

        return requiredSlot;
    }
    //method used to update the status of a specific time slot based on the booking time. 
    public Slot toEditSlot(Slot slot, String bookingTime, boolean value) {
        if (slot != null) {

            switch (bookingTime) {

                case "10:00":
                    slot.setTen(value);
                    break;
                case "11:00":
                    slot.setEleven(value);
                    break;
                case "12:00":
                    slot.setTwelve(value);
                    break;
                case "13:00":
                    slot.setThirteen(value);
                    break;
                case "14:00":
                    slot.setFourteen(value);
                    break;
                case "15:00":
                    slot.setFifteen(value);
                    break;
                case "16:00":
                    slot.setSixteen(value);
                    break;
                case "17:00":
                    slot.setSeventeen(value);
                    break;
                case "18:00":
                    slot.setEighteen(value);
                    break;
                default:
                    System.out.println("\n\n***********None of the cases matched********\n\n");
            }
        }
        return slot;
    }

    @Override
    //    This method updates the payment status of an existing appointment to mark it as paid.
    // It takes a long parameter id, which represents the id of the appointment to be updated.
    // The method returns the updated AppointmentInfo entity.
    public AppointmentInfo editPayment(long id) {
        List<AppointmentInfo> appointments = allAppointments();
        AppointmentInfo appointment = new AppointmentInfo();
        for (AppointmentInfo x : appointments) {
            if (x.getAppointmentId() == id) {
                x.setPaymentDone("yes");
                appointment = x;
                this.appointmentInfoRepository.save(appointment);
            }
        }
        return appointment;
    }
}

