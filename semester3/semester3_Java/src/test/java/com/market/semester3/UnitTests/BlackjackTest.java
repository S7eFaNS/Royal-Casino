package com.market.semester3.UnitTests;

import com.market.semester3.business.BlackjackManager;
import com.market.semester3.business.exception.InsufficientBalanceException;
import com.market.semester3.business.impl.BlackjackService;
import com.market.semester3.business.impl.UserService;
import com.market.semester3.persistence.UserRepository;
import com.market.semester3.persistence.entity.User;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)

public class BlackjackTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private BlackjackService blackjackManager;

    @Test
    public void testPlaceBetWhenUserExistsAndHasSufficientBalance() {
        long userId = 1L;
        double betAmount = 50.0;

        User mockUser = new User();
        mockUser.setId(userId);
        mockUser.setBalance(100.0);

        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        double updatedBalance = blackjackManager.placeBet(userId, betAmount);

        assertEquals(50.0, updatedBalance);
        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    public void testPlaceBetWhenUserExistsAndHasInsufficientBalance() {
        long userId = 2L;
        double betAmount = 150.0;

        User mockUser = new User();
        mockUser.setId(userId);
        mockUser.setBalance(100.0);

        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        assertThrows(InsufficientBalanceException.class, () -> {
            blackjackManager.placeBet(userId, betAmount);
        });

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    public void testWinWhenUserExists() {
        long userId = 1L;
        double winningAmount = 50.0;

        User mockUser = new User();
        mockUser.setId(userId);
        mockUser.setBalance(100.0);

        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        double updatedBalance = blackjackManager.win(userId, winningAmount);

        assertEquals(150.0, updatedBalance);
        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    public void testWinWhenUserDoesNotExist() {
        long userId = 3L;
        double winningAmount = 50.0;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            blackjackManager.win(userId, winningAmount);
        });

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).save(any(User.class));
    }

}
