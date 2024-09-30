package com.market.semester3.UnitTests;

import com.market.semester3.business.impl.PurchaseHistoryService;
import com.market.semester3.controllers.DTOs.PurchaseHistoryResponse;
import com.market.semester3.persistence.InventoryRepository;
import com.market.semester3.persistence.PurchaseHistoryRepository;
import com.market.semester3.persistence.entity.Inventory;
import com.market.semester3.persistence.entity.PurchaseHistory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PurchaseHistoryTest {
    @Mock
    private InventoryRepository inventoryRepository;

    @Mock
    private PurchaseHistoryRepository purchaseHistoryRepository;

    @InjectMocks
    private PurchaseHistoryService purchaseHistoryService;

    @Test
    public void testWithdrawSkinFromInventory_WhenInventoryExists() {
        Long userId = 1L;
        Long skinId = 1L;

        Inventory inventoryItem = new Inventory();
        inventoryItem.setItemName("TestItem");
        inventoryItem.setItemPrice(20.0);

        when(inventoryRepository.findByUserIdAndSkinId(userId, skinId)).thenReturn(Optional.of(inventoryItem));
        when(purchaseHistoryRepository.save(any(PurchaseHistory.class))).thenReturn(null);
        doNothing().when(inventoryRepository).delete(any(Inventory.class));

        purchaseHistoryService.withdrawSkinFromInventory(userId, skinId);

        verify(purchaseHistoryRepository, times(1)).save(any(PurchaseHistory.class));
        verify(inventoryRepository, times(1)).delete(any(Inventory.class));
    }

    @Test
    public void testWithdrawSkinFromInventory_WhenInventoryDoesNotExist() {
        Long userId = 1L;
        Long skinId = 1L;

        when(inventoryRepository.findByUserIdAndSkinId(userId, skinId)).thenReturn(Optional.empty());

        purchaseHistoryService.withdrawSkinFromInventory(userId, skinId);

        verify(purchaseHistoryRepository, never()).save(any());
        verify(inventoryRepository, never()).delete(any());
    }

    @Test
    public void testGetAllPurchasesForUser() {
        Long userId = 1L;

        List<PurchaseHistory> purchaseHistories = new ArrayList<>();

        when(purchaseHistoryRepository.findAllByUserId(userId)).thenReturn(purchaseHistories);

        List<PurchaseHistoryResponse> purchaseHistoryResponses = purchaseHistoryService.getAllPurchasesForUser(userId);
    }
}
