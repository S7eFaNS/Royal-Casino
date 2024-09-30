package com.market.semester3.business;

import com.market.semester3.controllers.DTOs.PurchaseHistoryResponse;
import com.market.semester3.controllers.DTOs.UserLeaderboardResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PurchaseHistoryManager {
    public void withdrawSkinFromInventory(Long userId, Long skinId);
    public List<PurchaseHistoryResponse> getAllPurchasesForUser(Long userId);
    public List<UserLeaderboardResponse> findTopUsersWithMostPurchases(int topUsers);
}
