package com.market.semester3.controllers.impl;

import com.market.semester3.business.SkinManager;
import com.market.semester3.controllers.DTOs.CreateSkinRequest;
import com.market.semester3.persistence.entity.Skin;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @CrossOrigin("http://localhost:5173")
    @RestController
    @RequestMapping("/api/skins")
    @AllArgsConstructor
public class SkinController {

    private final SkinManager skinManager;

    @PostMapping("/admin/create")
    public void createSkin(@RequestBody CreateSkinRequest createSkinRequest) {
        skinManager.createSkin(createSkinRequest);
    }

    @GetMapping("/searchByName")
    public ResponseEntity<List<Skin>> searchByName(@RequestParam String name) {
        List<Skin> skins = skinManager.searchByName(name);
        return ResponseEntity.ok(skins);
    }
}
