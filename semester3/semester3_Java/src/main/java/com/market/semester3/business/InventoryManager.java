package com.market.semester3.business;

import com.market.semester3.controllers.DTOs.GetSkinResponse;

import java.util.List;

public interface InventoryManager {
    public void moveSkinToInventory(Long userId, Long skinId);
    public List<GetSkinResponse> getUserInventory(Long userId);
    public void sellSkinFromInventory(Long userId, Long skinId);
}
