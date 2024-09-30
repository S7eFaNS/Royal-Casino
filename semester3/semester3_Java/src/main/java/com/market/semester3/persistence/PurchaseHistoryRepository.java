package com.market.semester3.persistence;

import com.market.semester3.controllers.DTOs.UserLeaderboardResponse;
import com.market.semester3.persistence.entity.PurchaseHistory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {
    List<PurchaseHistory> findAllByUserId(Long userId);

    @Query("SELECT h.userId, u.name, COUNT(h.purchaseId) as purchaseCount FROM PurchaseHistory h JOIN h.user u GROUP BY h.userId, u.name ORDER BY purchaseCount DESC")
    List<Object[]> findUsersWithMostPurchases(Pageable pageable);
}
