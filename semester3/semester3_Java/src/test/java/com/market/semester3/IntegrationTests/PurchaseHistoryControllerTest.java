package com.market.semester3.IntegrationTests;

import com.market.semester3.business.PurchaseHistoryManager;
import com.market.semester3.controllers.impl.PurchaseHistoryController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class PurchaseHistoryControllerTest {
    private MockMvc mockMvc;

    @Mock
    private PurchaseHistoryManager purchaseHistoryManager;

    @InjectMocks
    private PurchaseHistoryController purchaseHistoryController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(purchaseHistoryController).build();
    }

    @Test
    public void testWithdrawSkinFromInventory() throws Exception {
        Long userId = 1L;
        Long skinId = 1L;

        mockMvc.perform(post("/api/purchasehistory/withdraw")
                        .param("userId", String.valueOf(userId))
                        .param("skinId", String.valueOf(skinId)))
                .andExpect(status().isOk())
                .andExpect(content().string("Skin withdrawn from inventory successfully!"));

        verify(purchaseHistoryManager, times(1)).withdrawSkinFromInventory(userId, skinId);
    }
}
