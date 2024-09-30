package com.market.semester3.controllers.impl;

import com.market.semester3.business.InventoryManager;
import com.market.semester3.controllers.DTOs.GetSkinResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/inventory")
@AllArgsConstructor
public class InventoryController {

    private final InventoryManager inventoryManager;

    @PostMapping("/buy")
    public ResponseEntity<String> buySkin(@RequestParam Long userId, @RequestParam Long skinId) {
        try {
            inventoryManager.moveSkinToInventory(userId, skinId);
            return ResponseEntity.ok("Skin purchased and moved to inventory successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to purchase skin: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GetSkinResponse>> getUserSkins(@PathVariable Long userId) {
        List<GetSkinResponse> userSkins = inventoryManager.getUserInventory(userId);
        if (userSkins.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(userSkins);
    }

    @PostMapping("/sell")
    public ResponseEntity<String> sellSkinFromInventory(@RequestParam Long userId, @RequestParam Long skinId) {
        try {
            inventoryManager.sellSkinFromInventory(userId, skinId);
            return ResponseEntity.ok("Skin sold from inventory successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to sell skin from inventory: " + e.getMessage());
        }
    }
}
