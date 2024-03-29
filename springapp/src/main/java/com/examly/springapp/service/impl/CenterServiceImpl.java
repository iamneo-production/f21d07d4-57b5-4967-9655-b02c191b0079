package com.examly.springapp.service.impl;

import java.util.Optional;
import com.examly.springapp.model.Center;
import com.examly.springapp.repo.CenterRepository;
import com.examly.springapp.repo.ReviewRepository;
import com.examly.springapp.service.CenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Slot;
import com.examly.springapp.model.AppointmentInfo;
import com.examly.springapp.service.AppointmentInfoService;

import java.util.ArrayList;
import java.util.List;

@Service
public class CenterServiceImpl implements CenterService {
    // properties
    @Autowired
    private CenterRepository serviceCenterRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    // @Autowired
    // private AppointmentInfoService appointmentInfoService;

    @Override

    //This method is used to add a new service center to the database. 
    // It initializes the time slots for the new center using the initSlots method of the Center entity and then saves the center to the database.
    public Center addCenter(Center serviceCenter) {
        serviceCenter.initSlots();
        return this.serviceCenterRepository.save(serviceCenter);
    }

    @Override
    //This method is used to retrieve a service center by its id. It searches for the center with the specified id in the database and returns it if found.
    public Center getCenter(long id) {

        Optional<Center> center = serviceCenterRepository.findById(id);

        Center myCenter = center.orElseThrow(() -> new RuntimeException("No such data found"));

        return myCenter;
    }

    @Override
    //This method is used to retrieve all the service centers from the database. It returns a list of all service centers.
    public List<Center> viewCenter() {
        return this.serviceCenterRepository.findAll();
    }

    @Override
    //This method is used to edit an existing service center. It updates the details of the center, such as name, mobile number, address, etc., 
    // with the provided information.
    public Center editCenter(Center serviceCenter, Long id) {

        System.out.println("Edit center started------------------------------");

        Optional<Center> center = serviceCenterRepository.findById(id);

        Center myCenter = center.orElseThrow(() -> new RuntimeException("No such data found"));

        myCenter.setName(serviceCenter.getName());
        myCenter.setMobileNumber(serviceCenter.getMobileNumber());
        myCenter.setAddress(serviceCenter.getAddress());
        myCenter.setEmail(serviceCenter.getEmail());
        myCenter.setImgUrl(serviceCenter.getImgUrl());
        myCenter.setDescription(serviceCenter.getDescription());
        myCenter.setSlots(serviceCenter.getSlots());

        serviceCenterRepository.save(myCenter);

        System.out.println("Edit center done---------------------------------------------------");

        return myCenter;
    }

    @Override

    //This method is used to delete a service center by its id. 
    // It also deletes all the reviews associated with the center using the reviewRepository. Additionally, it deletes the center from the database.
    public Center deleteCenter(long id) {
        List<Center> serviceCenters = viewCenter();
        reviewRepository.deleteByCenterServiceCenterId(id);
        Center serviceCenter = new Center();
        for (Center x : serviceCenters) {
            if (x.getServiceCenterId() == id) {
                serviceCenter = x;
                serviceCenterRepository.delete(x);
            }
        }

        // List<AppointmentInfo> appointments =
        // appointmentInfoService.allAppointments();
        // for (AppointmentInfo appointment : appointments) {
        // if (appointment.getServiceCenterId() == serviceCenter.getServiceCenterId()) {
        // appointmentInfoService.deleteAppointment(appointment.getAppointmentId());
        // }
        // }
        return serviceCenter;
    }
}


/*
package com.examly.springapp.service.impl;

import java.util.Optional;
import com.examly.springapp.model.Center;
import com.examly.springapp.repo.CenterRepository;
import com.examly.springapp.repo.ReviewRepository;
import com.examly.springapp.service.CenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Slot;
import com.examly.springapp.model.AppointmentInfo;
import com.examly.springapp.service.AppointmentInfoService;

import java.util.ArrayList;
import java.util.List;

@Service
public class CenterServiceImpl implements CenterService {
    // properties
    @Autowired
    private CenterRepository serviceCenterRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    // @Autowired
    // private AppointmentInfoService appointmentInfoService;

    @Override

    //This method is used to add a new service center to the database. 
    // It initializes the time slots for the new center using the initSlots method of the Center entity and then saves the center to the database.
    public Center addCenter(Center serviceCenter) {
        serviceCenter.initSlots();
        return this.serviceCenterRepository.save(serviceCenter);
    }

    @Override
    //This method is used to retrieve a service center by its id. It searches for the center with the specified id in the database and returns it if found.
    public Center getCenter(long id) {

        Optional<Center> center = serviceCenterRepository.findById(id);

        Center myCenter = center.orElseThrow(() -> new RuntimeException("No such data found"));

        return myCenter;
    }

    @Override
    //This method is used to retrieve all the service centers from the database. It returns a list of all service centers.
    public List<Center> viewCenter() {
        return this.serviceCenterRepository.findAll();
    }

    @Override
    //This method is used to edit an existing service center. It updates the details of the center, such as name, mobile number, address, etc., 
    // with the provided information.
    public Center editCenter(Center serviceCenter, Long id) {
    // properties
    @Autowired
    private CenterRepository serviceCenterRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    // @Autowired
    // private AppointmentInfoService appointmentInfoService;

    @Override

        System.out.println("Edit center started------------------------------");

        Optional<Center> center = serviceCenterRepository.findById(id);

        Center myCenter = center.orElseThrow(() -> new RuntimeException("No such data found"));

        myCenter.setName(serviceCenter.getName());
        myCenter.setMobileNumber(serviceCenter.getMobileNumber());
        myCenter.setAddress(serviceCenter.getAddress());
        myCenter.setEmail(serviceCenter.getEmail());
        myCenter.setImgUrl(serviceCenter.getImgUrl());
        myCenter.setDescription(serviceCenter.getDescription());
        myCenter.setSlots(serviceCenter.getSlots());

        serviceCenterRepository.save(myCenter);

        System.out.println("Edit center done---------------------------------------------------");

        return myCenter;
    }

    @Override

    //This method is used to delete a service center by its id. 
    // It also deletes all the reviews associated with the center using the reviewRepository. Additionally, it deletes the center from the database.
    public Center deleteCenter(long id) {
        List<Center> serviceCenters = viewCenter();
        reviewRepository.deleteByCenterServiceCenterId(id);
        Center serviceCenter = new Center();
        for (Center x : serviceCenters) {
            if (x.getServiceCenterId() == id) {
                serviceCenter = x;
                serviceCenterRepository.delete(x);
            }
        }
        // properties
    @Autowired
    private CenterRepository serviceCenterRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    // @Autowired
    // private AppointmentInfoService appointmentInfoService;

    @Override
    //}

        // List<AppointmentInfo> appointments =
        // appointmentInfoService.allAppointments();
        // for (AppointmentInfo appointment : appointments) {
        // if (appointment.getServiceCenterId() == serviceCenter.getServiceCenterId()) {
        // appointmentInfoService.deleteAppointment(appointment.getAppointmentId());
        // }
        // }
        return serviceCenter;
    }
}
*/
     
