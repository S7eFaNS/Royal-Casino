package com.market.semester3.controllers.DTOs;

import com.market.semester3.domain.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class CreateUserRequest {

    @NotBlank
    private String name;

    @NotBlank
    @Size(min = 6)
    private String password;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private double balance = 0.0;

    @NotBlank
    private UserType userType;
}
