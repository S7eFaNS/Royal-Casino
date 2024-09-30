package com.market.semester3.business.impl;

import com.market.semester3.business.PurchaseHistoryManager;
import com.market.semester3.controllers.DTOs.PurchaseHistoryResponse;
import com.market.semester3.controllers.DTOs.UserLeaderboardResponse;
import com.market.semester3.persistence.InventoryRepository;
import com.market.semester3.persistence.PurchaseHistoryRepository;
import com.market.semester3.persistence.UserRepository;
import com.market.semester3.persistence.entity.Inventory;
import com.market.semester3.persistence.entity.PurchaseHistory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PurchaseHistoryService implements PurchaseHistoryManager {

    private final InventoryRepository inventoryRepository;

    private final PurchaseHistoryRepository purchaseHistoryRepository;

    public void withdrawSkinFromInventory(Long userId, Long skinId) {
        Optional<Inventory> inventory = inventoryRepository.findByUserIdAndSkinId(userId, skinId);

        if (inventory.isPresent()) {
            Inventory inventoryItem = inventory.get();

            PurchaseHistory purchaseHistory = new PurchaseHistory();
            purchaseHistory.setUserId(userId);
            purchaseHistory.setSkinId(skinId);
            purchaseHistory.setItemName(inventoryItem.getItemName());
            purchaseHistory.setItemPrice(inventoryItem.getItemPrice());
            purchaseHistory.setPurchaseDate(new Timestamp(System.currentTimeMillis()));

            purchaseHistoryRepository.save(purchaseHistory);
            inventoryRepository.delete(inventoryItem);
        }
    }

    public List<PurchaseHistoryResponse> getAllPurchasesForUser(Long userId) {
        List<PurchaseHistory> purchaseHistories = purchaseHistoryRepository.findAllByUserId(userId);

        List<PurchaseHistoryResponse> purchaseHistoryResponses = new ArrayList<>();
        for (PurchaseHistory purchaseHistory : purchaseHistories) {
            PurchaseHistoryResponse response = new PurchaseHistoryResponse();
            response.setSkinId(purchaseHistory.getSkinId());
            response.setItemName(purchaseHistory.getItemName());
            response.setItemPrice(purchaseHistory.getItemPrice());
            response.setPurchaseDate(purchaseHistory.getPurchaseDate());

            purchaseHistoryResponses.add(response);
        }

        return purchaseHistoryResponses;
    }

    public List<UserLeaderboardResponse> findTopUsersWithMostPurchases(int topUsers) {
        Pageable pageable = PageRequest.of(0, topUsers);
        return purchaseHistoryRepository.findUsersWithMostPurchases(pageable).stream()
                .map(objects -> new UserLeaderboardResponse((Long) objects[0],(String) objects[1], (Long) objects[2]))
                .collect(Collectors.toList());
    }
}
