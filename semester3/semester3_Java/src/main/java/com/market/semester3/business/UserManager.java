package com.market.semester3.business;

import com.market.semester3.controllers.DTOs.*;

import java.util.List;

public interface UserManager {
    public AuthenticateResponse register(CreateUserRequest request);
    public AuthenticateResponse authenticate(LoginRequest request);
    public List<GetUsersResponse> getAllUsers();
    public GetUsersResponse getUserById(Long userId);
    public GetUsersResponse updateUser(Long userId, EditUserRequest request);
    public void deleteUser(Long userId);
    public void depositMoney(Long userId);

}
