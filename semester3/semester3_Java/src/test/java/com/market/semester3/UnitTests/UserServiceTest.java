package com.market.semester3.UnitTests;

import com.market.semester3.business.impl.UserService;
import com.market.semester3.controllers.DTOs.EditUserRequest;
import com.market.semester3.controllers.DTOs.GetUsersResponse;
import com.market.semester3.domain.UserType;
import com.market.semester3.persistence.UserRepository;
import com.market.semester3.persistence.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void testGetUserByIdWhenUserExists() {
        long userId = 1L;

        User mockUser = new User();
        mockUser.setId(userId);
        mockUser.setName("John Doe");
        mockUser.setEmail("john@example.com");
        mockUser.setBalance(100.0);
        mockUser.setUserType(UserType.Customer);

        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        GetUsersResponse response = userService.getUserById(userId);

        GetUsersResponse expectedResponse = userService.getGetUsersResponse(mockUser);

        assertNotNull(response);
        assertEquals(expectedResponse.getId(), response.getId());
        assertEquals(expectedResponse.getName(), response.getName());
        assertEquals(expectedResponse.getEmail(), response.getEmail());
        assertEquals(expectedResponse.getBalance(), response.getBalance());
        assertEquals(expectedResponse.getUserType(), response.getUserType());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    public void testGetUserByIdWhenUserDoesNotExist() {
        long userId = 2L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        GetUsersResponse response = userService.getUserById(userId);

        assertNull(response);
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    public void testGetAllUsersWhenListIsNotEmpty() {
        List<User> userList = new ArrayList<>();
        userList.add(new User());
        when(userRepository.findAll()).thenReturn(userList);

        List<GetUsersResponse> responseList = userService.getAllUsers();

        assertNotNull(responseList);
        assertFalse(responseList.isEmpty());

        verify(userRepository, times(1)).findAll();
    }

    @Test
    public void testGetAllUsersWhenListIsEmpty() {
        when(userRepository.findAll()).thenReturn(new ArrayList<>());

        List<GetUsersResponse> responseList = userService.getAllUsers();

        assertNotNull(responseList);
        assertTrue(responseList.isEmpty());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    public void testUpdateUserWhenUserExistsAndIsUpdatedSuccessfully() {
        long userId = 1L;
        EditUserRequest request = new EditUserRequest();
        request.setName("New Name");
        request.setEmail("newemail@example.com");
        request.setBalance(100);

        User existingUser = new User();
        existingUser.setId(userId);
        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));

        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        GetUsersResponse response = userService.updateUser(userId, request);

        GetUsersResponse expectedResponse = userService.getGetUsersResponse(existingUser);

        assertNotNull(response);
        assertEquals(expectedResponse.getId(), response.getId());
        assertEquals(expectedResponse.getName(), response.getName());
        assertEquals(expectedResponse.getEmail(), response.getEmail());
        assertEquals(expectedResponse.getBalance(), response.getBalance());
        assertEquals(expectedResponse.getUserType(), response.getUserType());

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    public void testUpdateUserWhenUserDoesNotExist() {
        long userId = 2L;
        EditUserRequest request = new EditUserRequest();
        request.setName("New Name");
        request.setEmail("newemail@example.com");
        request.setBalance(100);

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            userService.updateUser(userId, request);
        });

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    public void testDeleteUserWhenExistingUser() {
        Long userId = 1L;

        User existingUser = new User();
        existingUser.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));

        userService.deleteUser(userId);

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).deleteById(userId);
    }

    @Test
    public void testDeleteUserWhenNonExistentUser() {
        long userId = 2L;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            userService.deleteUser(userId);
        });

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).deleteById(userId);
    }

    @Test
    public void testDepositMoneyWhenUserExists() {
        long userId = 1L;

        User mockUser = new User();
        mockUser.setId(userId);
        mockUser.setBalance(100.0);

        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        assertDoesNotThrow(() -> {
            userService.depositMoney(userId);
        });

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).save(any(User.class));

        assertEquals(1100.0, mockUser.getBalance());
    }

}
