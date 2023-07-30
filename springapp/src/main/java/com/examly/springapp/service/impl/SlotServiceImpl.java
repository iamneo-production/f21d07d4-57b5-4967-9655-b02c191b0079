package com.examly.springapp.service.impl;

import com.examly.springapp.model.Slot;
import com.examly.springapp.service.SlotService;
import com.examly.springapp.repo.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SlotServiceImpl implements SlotService {

    @Autowired
    SlotRepository slotRepository;

    @Transactional

    //    This method is used to edit an existing slot. It receives a Slot object containing the updated slot details.
     //The method first retrieves the existing slot from the database using its slotId.
    // Then, it updates the slot details (availability for each time slot) with the new values provided in the Slot object.
    // Finally, it saves the updated slot to the database using the slotRepository.
    public void editSlot(Slot slot) {

        System.out.println("Edit slot called--------------------------------------------------");

        long id = slot.getSlotId();

        Optional<Slot> option = slotRepository.findById(id);

        Slot mySlot = option.orElseThrow(() -> new RuntimeException("No such data found"));

        mySlot.setTen(slot.isTen());
        mySlot.setEleven(slot.isEleven());
        mySlot.setTwelve(slot.isTwelve());
        mySlot.setThirteen(slot.isThirteen());
        mySlot.setFourteen(slot.isFourteen());
        mySlot.setFifteen(slot.isFifteen());
        mySlot.setSixteen(slot.isSixteen());
        mySlot.setSeventeen(slot.isSeventeen());
        mySlot.setEighteen(slot.isEighteen());

        System.out.println("\n\nSlot after editting: " + mySlot);

        System.out.println("\n\nEnd of Edit Slot saving slot details------------------------------------\n\n");

        slotRepository.save(mySlot);
    }
}
