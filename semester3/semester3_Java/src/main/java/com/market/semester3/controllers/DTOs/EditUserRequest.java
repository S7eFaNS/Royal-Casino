package com.market.semester3.controllers.DTOs;

import com.market.semester3.domain.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class EditUserRequest {

    private String name;

    private String email;

    private double balance;

    private UserType userType;
}
