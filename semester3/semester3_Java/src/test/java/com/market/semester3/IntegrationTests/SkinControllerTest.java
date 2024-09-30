package com.market.semester3.IntegrationTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.market.semester3.business.SkinManager;
import com.market.semester3.controllers.DTOs.CreateSkinRequest;
import com.market.semester3.controllers.impl.SkinController;
import com.market.semester3.persistence.entity.Skin;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class SkinControllerTest {
    private MockMvc mockMvc;

    @Mock
    private SkinManager skinManager;

    @InjectMocks
    private SkinController skinController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(skinController).build();
    }

    @Test
    public void testCreateSkin() throws Exception {
        CreateSkinRequest request = new CreateSkinRequest();
        request.setName("Test Skin");
        request.setPrice(10.0);
        request.setDescription("Description");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/skins/admin/create")
                        .content(asJsonString(request))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testSearchByName() throws Exception {
        Skin mockSkin = new Skin();
        mockSkin.setName("Test Skin");
        mockSkin.setPrice(10.0);
        mockSkin.setDescription("Description");

        List<Skin> mockSkinList = Collections.singletonList(mockSkin);

        when(skinManager.searchByName(anyString())).thenReturn(mockSkinList);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/skins/searchByName")
                        .param("name", "Test Skin"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("Test Skin"));
    }

    private String asJsonString(Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
