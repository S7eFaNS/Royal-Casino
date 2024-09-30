package com.market.semester3.controllers.DTOs;

import lombok.Data;

@Data
public class CreateSkinRequest {
    private String name;
    private Double price;
    private String description;
    private String img;
}
