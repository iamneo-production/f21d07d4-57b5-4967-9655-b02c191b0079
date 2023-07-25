package com.examly.springapp.model;

import lombok.*;
import javax.persistence.*;

import com.examly.springapp.model.Center;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    //The class defines various fields representing slot details, such as slotId, date, and different time slots from 10 AM to 6 PM 
    // (ten, eleven, ..., eighteen).
    private long slotId;

    private String date;

    private boolean ten;

    private boolean eleven;

    private boolean twelve;

    private boolean thirteen;

    private boolean fourteen;

    private boolean fifteen;

    private boolean sixteen;

    private boolean seventeen;

    private boolean eighteen;

    //The class overrides the toString() method to provide a string representation of a Slot object. 
    // It formats and returns the slot details in a readable format.
    @Override
    public String toString() {
        return slotId + " " + date + " " + "Ten: " + ten + " Eleven: " + eleven + " Twelve: " + twelve + " Thirteen: " +
                thirteen + " Fourteen: " + fourteen + " Fifteen: " + fifteen + " Sixteen: " + sixteen + " Seventeen: " +
                seventeen + " Eighteen: " + eighteen;
    }

}
