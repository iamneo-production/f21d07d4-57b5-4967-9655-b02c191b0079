package com.examly.springapp.controller;

import com.examly.springapp.model.Center;
import com.examly.springapp.service.CenterService;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CenterController {
    // properties
    @Autowired
    private CenterService serviceCenterService;

    // adding Service Center
    @PostMapping("/addServiceCenter")
    public Center addServiceCenter(@RequestBody Center serviceCenter) {
        return this.serviceCenterService.addCenter(serviceCenter);
    }

    // view all Service Center
    @GetMapping("/getServiceCenter")
    public List<Center> viewServiceCenter() {
        return this.serviceCenterService.viewCenter();
    }

    // get service center by id
    @GetMapping("/getServiceCenter/{id}")
    public Center viewServiceCenter(@PathVariable("id") String id) {
        long centerId = Long.parseLong(id);
        return this.serviceCenterService.getCenter(centerId);
    }

    // updating Service Center
    @PutMapping(value = "/editServiceCenter/{id}")
    public Center editCenter(@RequestBody Center serviceCenter,
            @PathVariable("id") Long id) {
        return this.serviceCenterService.editCenter(serviceCenter, id);
    }

    // delete Service Center
    @DeleteMapping("/deleteServiceCenter/{id}")
    public Center deleteServiceCenter(@PathVariable long id) {
        return this.serviceCenterService.deleteCenter(id);
    }
}