package com.market.semester3.business.impl;

import com.market.semester3.business.SkinManager;
import com.market.semester3.controllers.DTOs.CreateSkinRequest;
import com.market.semester3.persistence.SkinRepository;
import com.market.semester3.persistence.entity.Skin;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SkinImpl implements SkinManager {

    private final SkinRepository skinRepository;

    public void createSkin(CreateSkinRequest createSkinRequest){
        Skin skin = new Skin();
        skin.setName(createSkinRequest.getName());
        skin.setPrice(createSkinRequest.getPrice());
        skin.setDescription(createSkinRequest.getDescription());
        skin.setImg(createSkinRequest.getImg());
        skinRepository.save(skin);
    }

    public List<Skin> searchByName(String name) {
        return skinRepository.findByNameContainingIgnoreCase(name);
    }
}
