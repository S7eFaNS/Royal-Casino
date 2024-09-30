package com.market.semester3.IntegrationTests;

import com.market.semester3.business.InventoryManager;
import com.market.semester3.controllers.impl.InventoryController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class InventoryControllerTest {
    private MockMvc mockMvc;

    @Mock
    private InventoryManager inventoryManager;

    @InjectMocks
    private InventoryController inventoryController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(inventoryController).build();
    }

    @Test
    public void testBuySkin() throws Exception {
        Long userId = 1L;
        Long skinId = 1L;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/inventory/buy")
                        .param("userId", String.valueOf(userId))
                        .param("skinId", String.valueOf(skinId))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(inventoryManager, times(1)).moveSkinToInventory(userId, skinId);
    }

    @Test
    public void testSellSkinFromInventory() throws Exception {
        Long userId = 1L;
        Long skinId = 1L;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/inventory/sell")
                        .param("userId", String.valueOf(userId))
                        .param("skinId", String.valueOf(skinId))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(inventoryManager, times(1)).sellSkinFromInventory(userId, skinId);
    }
}
