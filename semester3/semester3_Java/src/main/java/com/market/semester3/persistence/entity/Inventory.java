package com.market.semester3.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "inventory")
@Data
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id")
    private Long purchaseId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "skin_id")
    private Long skinId;

    @Column(name = "skin_name")
    private String itemName;

    @Column(name = "skin_price")
    private Double itemPrice;

    @Column(name = "skin_description")
    private String description;

    @Lob
    @Column(name = "skin_img", columnDefinition = "mediumblob")
    private String img;
}
