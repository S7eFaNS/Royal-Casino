package com.market.semester3.UnitTests;

import com.market.semester3.business.impl.SkinImpl;
import com.market.semester3.controllers.DTOs.CreateSkinRequest;
import com.market.semester3.persistence.SkinRepository;
import com.market.semester3.persistence.entity.Skin;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)

public class SkinImplTest {

    @Mock
    private SkinRepository skinRepository;
    @InjectMocks
    private SkinImpl skinImpl;

    @Test
    public void testCreateSkin() {
        CreateSkinRequest request = new CreateSkinRequest();
        request.setName("SkinName");
        request.setPrice(10.0);
        request.setDescription("Description");
        request.setImg("img_path");

        when(skinRepository.save(any(Skin.class))).thenReturn(new Skin());

        skinImpl.createSkin(request);

        ArgumentCaptor<Skin> captor = ArgumentCaptor.forClass(Skin.class);
        verify(skinRepository, times(1)).save(captor.capture());

        Skin capturedSkin = captor.getValue();
        assertEquals("SkinName", capturedSkin.getName());
        assertEquals(10.0, capturedSkin.getPrice());
        assertEquals("Description", capturedSkin.getDescription());
        assertEquals("img_path", capturedSkin.getImg());
    }

    @Test
    public void testSearchByName() {
        String searchName = "SkinName";

        Skin skin = new Skin();
        skin.setName("SkinName");
        skin.setPrice(10.0);
        skin.setDescription("Description");
        skin.setImg("img_path");

        List<Skin> skins = new ArrayList<>();
        skins.add(skin);
        when(skinRepository.findByNameContainingIgnoreCase(searchName)).thenReturn(skins);

        List<Skin> foundSkins = skinImpl.searchByName(searchName);

        assertNotNull(foundSkins);
        assertFalse(foundSkins.isEmpty());
        assertEquals(1, foundSkins.size());
        assertEquals("SkinName", foundSkins.get(0).getName());
    }

}
