package com.market.semester3.persistence;

import com.market.semester3.persistence.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findByUserId(Long userId);

    Optional<Inventory> findByUserIdAndSkinId(Long userId, Long skinId);

}
