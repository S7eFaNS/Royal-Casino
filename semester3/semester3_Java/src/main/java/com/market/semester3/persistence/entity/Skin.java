package com.market.semester3.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "skin")
@Data
public class Skin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long Id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "img", columnDefinition = "mediumblob")
    private String img;
}
