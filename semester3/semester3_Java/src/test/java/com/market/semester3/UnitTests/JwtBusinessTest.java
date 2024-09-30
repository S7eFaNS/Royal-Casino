package com.market.semester3.UnitTests;

import com.market.semester3.business.exception.InvalidCredentialsException;
import com.market.semester3.business.impl.UserService;
import com.market.semester3.config.security.JwtService;
import com.market.semester3.controllers.DTOs.AuthenticateResponse;
import com.market.semester3.controllers.DTOs.CreateUserRequest;
import com.market.semester3.controllers.DTOs.LoginRequest;
import com.market.semester3.domain.UserType;
import com.market.semester3.persistence.UserRepository;
import com.market.semester3.persistence.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class JwtBusinessTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private UserService userService;



    @Test
    public void testRegister() {
        CreateUserRequest createUserRequest = new CreateUserRequest("John Doe",  "password123", "john@example.com", 0, UserType.Customer);
        User mockUser = User.builder()
                .name(createUserRequest.getName())
                .email(createUserRequest.getEmail())
                .password("encodedPassword")
                .balance(createUserRequest.getBalance())
                .userType(UserType.Customer)
                .build();
        when(passwordEncoder.encode(createUserRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(mockUser);
        when(jwtService.generateToken(any(User.class))).thenReturn("mockJwtToken");

        AuthenticateResponse response = userService.register(createUserRequest);

        verify(userRepository, times(1)).save(any(User.class));
        verify(jwtService, times(1)).generateToken(any(User.class));

        assertEquals("mockJwtToken", response.getAccessToken());
    }

    @Test
    public void testAuthenticate() {
        LoginRequest loginRequest = new LoginRequest("john@example.com", "password123");
        User mockUser = User.builder()
                .name("John Doe")
                .email("john@example.com")
                .password("encodedPassword")
                .balance(0.0)
                .userType(UserType.Customer)
                .build();
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(mockUser));
        when(authenticationManager.authenticate(any(Authentication.class))).thenReturn(mock(Authentication.class));
        when(jwtService.generateToken(any(User.class))).thenReturn("mockJwtToken");

        AuthenticateResponse response = userService.authenticate(loginRequest);

        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtService, times(1)).generateToken(any(User.class));

        assertEquals("mockJwtToken", response.getAccessToken());
    }


    @Test
    public void testAuthenticateUsernameNotFound() {
        LoginRequest loginRequest = new LoginRequest("nonexistent@example.com", "password123");
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.empty());

        try {
            userService.authenticate(loginRequest);
        } catch (Exception e) {
            assertEquals(InvalidCredentialsException.class, e.getClass());
            verify(jwtService, never()).generateToken(any(User.class));
        }
    }



}
