package com.market.semester3.controllers.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetSkinResponse {
    private Long skinId;
    private String name;
    private Double price;
    private String description;
    private String img;
}
