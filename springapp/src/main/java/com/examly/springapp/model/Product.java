package com.examly.springapp.model;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Product {
    
    private String productName;
    private String purchaseDate;
    private String productModelNo;
    private String problemStatement;
    private String bookingDate;
    private String bookingTime;
}
