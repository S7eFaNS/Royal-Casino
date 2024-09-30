package com.market.semester3.business.impl;

import com.market.semester3.business.UserManager;
import com.market.semester3.business.exception.EmailAlreadyExistsException;
import com.market.semester3.business.exception.InvalidCredentialsException;
import com.market.semester3.config.security.JwtService;
import com.market.semester3.controllers.DTOs.*;
import com.market.semester3.domain.UserType;
import com.market.semester3.persistence.UserRepository;
import com.market.semester3.persistence.entity.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserManager {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public GetUsersResponse getUserById(Long userId) {
        User user = repository.findById(userId).orElse(null);
        if (user != null) {
            return getGetUsersResponse(user);
        }
        return null;
    }

    @Transactional
    public void depositMoney(Long userId) {
        User user = repository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        user.setBalance(user.getBalance() + 1000.0);
        repository.save(user);
    }

    public AuthenticateResponse register(CreateUserRequest request) {
        if (repository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already registered");
        }
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .balance(request.getBalance())
                .userType(UserType.Customer)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticateResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    public AuthenticateResponse authenticate(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            var user = repository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            var jwtToken = jwtService.generateToken(user);
            return AuthenticateResponse.builder()
                    .accessToken(jwtToken)
                    .build();
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException("Invalid credentials");
        }
    }

    public List<GetUsersResponse> getAllUsers() {
        List<User> userList = repository.findAll();
        List<GetUsersResponse> responseList = new ArrayList<>();

        for (User user : userList) {
            GetUsersResponse response = getGetUsersResponse(user);
            responseList.add(response);
        }

        return responseList;
    }

    public GetUsersResponse updateUser(Long userId, EditUserRequest request) {
        User existingUser = repository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        existingUser.setName(request.getName());
        existingUser.setEmail(request.getEmail());
        existingUser.setBalance(request.getBalance());

        User updatedUser = repository.save(existingUser);

        return getGetUsersResponse(updatedUser);
    }

    public void deleteUser(Long userId) {
        Optional<User> userOptional = repository.findById(userId);
        if (userOptional.isPresent()) {
            repository.deleteById(userId);
        } else {
            throw new NoSuchElementException("User not found");
        }
    }

    public GetUsersResponse getGetUsersResponse(User user) {
        GetUsersResponse response = new GetUsersResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setBalance(user.getBalance());
        response.setUserType(user.getUserType());

        return response;
    }
}