package com.market.semester3.UnitTests;

import com.market.semester3.business.impl.InventoryService;
import com.market.semester3.controllers.DTOs.GetSkinResponse;
import com.market.semester3.persistence.InventoryRepository;
import com.market.semester3.persistence.SkinRepository;
import com.market.semester3.persistence.UserRepository;
import com.market.semester3.persistence.entity.Inventory;
import com.market.semester3.persistence.entity.Skin;
import com.market.semester3.persistence.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class InventoryServiceTest {

    @Mock
    private InventoryRepository inventoryRepository;

    @Mock
    private SkinRepository skinRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private InventoryService inventoryService;

    @Test
    public void testMoveSkinToInventory_WithSufficientBalance() {
        Long userId = 1L;
        Long skinId = 1L;
        double skinPrice = 20.0;

        Skin skin = new Skin();
        skin.setPrice(skinPrice);

        User user = new User();
        user.setBalance(skinPrice + 10.0);

        when(skinRepository.findById(skinId)).thenReturn(Optional.of(skin));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(inventoryRepository.save(any(Inventory.class))).thenReturn(null);

        inventoryService.moveSkinToInventory(userId, skinId);

        verify(inventoryRepository, times(1)).save(any(Inventory.class));
        verify(userRepository, times(1)).save(any(User.class));
        verify(skinRepository, times(1)).delete(any(Skin.class));
    }

    @Test
    public void testGetUserInventory() {
        Long userId = 1L;

        Inventory inventory1 = new Inventory();
        inventory1.setSkinId(101L);
        inventory1.setItemName("Skin 1");
        inventory1.setItemPrice(20.0);
        inventory1.setDescription("Description 1");
        inventory1.setImg("img1.jpg");

        Inventory inventory2 = new Inventory();
        inventory2.setSkinId(102L);
        inventory2.setItemName("Skin 2");
        inventory2.setItemPrice(30.0);
        inventory2.setDescription("Description 2");
        inventory2.setImg("img2.jpg");

        List<Inventory> inventoryList = List.of(inventory1, inventory2);

        when(inventoryRepository.findByUserId(userId)).thenReturn(inventoryList);

        List<GetSkinResponse> result = inventoryService.getUserInventory(userId);

        assertEquals(2, result.size());

        GetSkinResponse response1 = result.get(0);
        assertEquals(inventory1.getSkinId(), response1.getSkinId());
        assertEquals(inventory1.getItemName(), response1.getName());
        assertEquals(inventory1.getItemPrice(), response1.getPrice());
        assertEquals(inventory1.getDescription(), response1.getDescription());
        assertEquals(inventory1.getImg(), response1.getImg());

        GetSkinResponse response2 = result.get(1);
        assertEquals(inventory2.getSkinId(), response2.getSkinId());
        assertEquals(inventory2.getItemName(), response2.getName());
        assertEquals(inventory2.getItemPrice(), response2.getPrice());
        assertEquals(inventory2.getDescription(), response2.getDescription());
        assertEquals(inventory2.getImg(), response2.getImg());

        verify(inventoryRepository, times(1)).findByUserId(userId);
    }


    @Test
    public void testSellSkinFromInventory_WhenInventoryAndUserExist() {
        Long userId = 1L;
        Long skinId = 1L;
        double itemPrice = 20.0;

        Inventory inventoryItem = new Inventory();
        inventoryItem.setItemPrice(itemPrice);

        User user = new User();
        user.setBalance(10.0);

        when(inventoryRepository.findByUserIdAndSkinId(userId, skinId)).thenReturn(Optional.of(inventoryItem));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(skinRepository.save(any(Skin.class))).thenReturn(null);

        inventoryService.sellSkinFromInventory(userId, skinId);

        verify(inventoryRepository, times(1)).delete(any(Inventory.class));
        verify(userRepository, times(1)).save(any(User.class));
        verify(skinRepository, times(1)).save(any(Skin.class));
    }
}
