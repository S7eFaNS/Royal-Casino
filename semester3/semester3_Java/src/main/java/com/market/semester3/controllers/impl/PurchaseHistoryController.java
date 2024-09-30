package com.market.semester3.controllers.impl;

import com.market.semester3.business.PurchaseHistoryManager;
import com.market.semester3.controllers.DTOs.PurchaseHistoryResponse;
import com.market.semester3.controllers.DTOs.UserLeaderboardResponse;
import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/purchasehistory")
@AllArgsConstructor
public class PurchaseHistoryController {

    private final PurchaseHistoryManager purchaseHistoryManager;
    @PostMapping("/withdraw")
    public ResponseEntity<String> withdrawSkinFromInventory(@RequestParam Long userId, @RequestParam Long skinId) {
        try {
            purchaseHistoryManager.withdrawSkinFromInventory(userId, skinId);
            return ResponseEntity.ok("Skin withdrawn from inventory successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to sell skin from inventory: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PurchaseHistoryResponse>> getAllPurchasesForUser(@PathVariable Long userId) {
        List<PurchaseHistoryResponse> purchaseHistory = purchaseHistoryManager.getAllPurchasesForUser(userId);
        return ResponseEntity.ok(purchaseHistory);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<UserLeaderboardResponse>> getLeaderboard() {
        List<UserLeaderboardResponse> leaderboard = purchaseHistoryManager.findTopUsersWithMostPurchases(5); // Adjust the number as needed
        return ResponseEntity.ok(leaderboard);
    }
}
