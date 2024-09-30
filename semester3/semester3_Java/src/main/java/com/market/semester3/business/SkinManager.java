package com.market.semester3.business;

import com.market.semester3.controllers.DTOs.CreateSkinRequest;
import com.market.semester3.persistence.entity.Skin;

import java.util.List;

public interface SkinManager {
    public void createSkin(CreateSkinRequest createSkinRequest);
    public List<Skin> searchByName(String name);
}
