package com.market.semester3.IntegrationTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.market.semester3.business.UserManager;
import com.market.semester3.controllers.DTOs.*;
import com.market.semester3.controllers.impl.UserController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserControllerTest {
    private MockMvc mockMvc;

    @Mock
    private UserManager userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void testGetUserById() throws Exception {
        GetUsersResponse mockUser = new GetUsersResponse();
        mockUser.setId(1L);
        mockUser.setName("Test User");

        when(userService.getUserById(anyLong())).thenReturn(mockUser);

        mockMvc.perform(get("/api/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Test User"));
    }
    @Test
    public void testRegister() throws Exception {
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");

        AuthenticateResponse mockResponse = new AuthenticateResponse();

        when(userService.register(any(CreateUserRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/user/auth/register")
                        .content(asJsonString(request))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testAuthenticate() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");

        AuthenticateResponse mockResponse = new AuthenticateResponse();

        when(userService.authenticate(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/user/auth/authenticate")
                        .content(asJsonString(request))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetAllUsers() throws Exception {
        GetUsersResponse mockUser = new GetUsersResponse();
        mockUser.setId(1L);
        mockUser.setName("Test User");

        List<GetUsersResponse> mockUsersList = Collections.singletonList(mockUser);

        when(userService.getAllUsers()).thenReturn(mockUsersList);

        mockMvc.perform(get("/api/user/admin/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Test User"));
    }

    @Test
    public void testDeleteUser() throws Exception {
        mockMvc.perform(delete("/api/user/admin/1"))
                .andExpect(status().isNoContent());

        verify(userService, times(1)).deleteUser(anyLong());
    }

    private String asJsonString(Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
