package com.market.semester3.controllers.impl;

import com.market.semester3.business.BlackjackManager;
import com.market.semester3.business.exception.InsufficientBalanceException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("api/blackjack/")
@AllArgsConstructor
public class BlackjackController {

    private final BlackjackManager blackjackManager;

    @PostMapping("/{userId}/placeBet")
    public ResponseEntity<String> placeBet(@PathVariable Long userId, @RequestParam double betAmount) {
        try {
            double newBalance = blackjackManager.placeBet(userId, betAmount);
            return ResponseEntity.ok("Bet placed successfully! New balance: " + newBalance);
        } catch (InsufficientBalanceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Insufficient balance for placing the bet");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error placing the bet: " + e.getMessage());
        }
    }

    @PostMapping("/{userId}/win")
    public ResponseEntity<String> win(@PathVariable Long userId, @RequestParam double winningAmount) {
        try {
            blackjackManager.win(userId, winningAmount);
            return ResponseEntity.ok("You won! +" + winningAmount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing winning: " + e.getMessage());
        }
    }
}
