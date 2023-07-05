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

    @Override
    public String toString() {
        return slotId + " " + date + " " + "Ten: " + ten + " Eleven: " + eleven + " Twelve: " + twelve + " Thirteen: " +
                thirteen + " Fourteen: " + fourteen + " Fifteen: " + fifteen + " Sixteen: " + sixteen + " Seventeen: " +
                seventeen + " Eighteen: " + eighteen;
    }

}
