package com.market.semester3.controllers.impl;

import com.market.semester3.business.UserManager;
import com.market.semester3.business.exception.EmailAlreadyExistsException;
import com.market.semester3.business.exception.InvalidCredentialsException;
import com.market.semester3.controllers.DTOs.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("api/user/")
@AllArgsConstructor

public class UserController {
    private final UserManager userService;

    @GetMapping("/{userId}")
    public ResponseEntity<GetUsersResponse> getUserById(@PathVariable Long userId){
        GetUsersResponse user = userService.getUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{userId}/deposit")
    public ResponseEntity<String> depositMoney(@PathVariable Long userId) {
        try {
            userService.depositMoney(userId);
            return ResponseEntity.ok("Money deposited successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error depositing money: " + e.getMessage());
        }
    }

    @PostMapping("/auth/register")
    public ResponseEntity<AuthenticateResponse> register(
            @RequestBody CreateUserRequest request
    ) {
        try {
            AuthenticateResponse response = userService.register(request);
            return ResponseEntity.ok(response);
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(AuthenticateResponse.builder()
                    .error("Email is already registered")
                    .build());
        }
    }
    @PostMapping("/auth/authenticate")
    public ResponseEntity<AuthenticateResponse> authenticate(
            @RequestBody LoginRequest request
    ) {
        try {
            AuthenticateResponse response = userService.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(AuthenticateResponse.builder()
                    .error("Invalid credentials")
                    .build());
        }
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<GetUsersResponse>> getAllUsers() {
        List<GetUsersResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/admin/{userId}")
    public ResponseEntity<GetUsersResponse> updateUser(
            @PathVariable Long userId,
            @RequestBody EditUserRequest request
    ) {
        GetUsersResponse updatedUser = userService.updateUser(userId, request);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/admin/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

}
