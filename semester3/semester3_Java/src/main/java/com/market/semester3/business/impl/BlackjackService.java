package com.market.semester3.business.impl;

import com.market.semester3.business.BlackjackManager;
import com.market.semester3.business.exception.InsufficientBalanceException;
import com.market.semester3.persistence.UserRepository;
import com.market.semester3.persistence.entity.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlackjackService implements BlackjackManager {
    private final UserRepository userRepository;

    @Transactional
    public double placeBet(Long userId, double betAmount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        if (user.getBalance() < betAmount) {
            throw new InsufficientBalanceException("Insufficient balance");
        }

        user.setBalance(user.getBalance() - betAmount);

        userRepository.save(user);

        return user.getBalance();
    }

    @Transactional
    public double win(Long userId, double winningAmount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        user.setBalance(user.getBalance() + winningAmount);

        userRepository.save(user);

        return user.getBalance();
    }
}
