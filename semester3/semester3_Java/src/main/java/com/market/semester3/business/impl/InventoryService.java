package com.market.semester3.business.impl;

import com.market.semester3.business.InventoryManager;
import com.market.semester3.business.exception.InsufficientBalanceException;
import com.market.semester3.controllers.DTOs.GetSkinResponse;
import com.market.semester3.persistence.InventoryRepository;
import com.market.semester3.persistence.SkinRepository;
import com.market.semester3.persistence.UserRepository;
import com.market.semester3.persistence.entity.Inventory;
import com.market.semester3.persistence.entity.Skin;
import com.market.semester3.persistence.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class InventoryService implements InventoryManager {

    private final InventoryRepository inventoryRepository;

    private final SkinRepository skinRepository;

    private final UserRepository userRepository;

    public void moveSkinToInventory(Long userId, Long skinId) {
        Optional<Skin> skinOptional = skinRepository.findById(skinId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (skinOptional.isPresent() && userOptional.isPresent()) {
            Skin skin = skinOptional.get();
            User user = userOptional.get();

            Double skinPrice = skin.getPrice();
            Double userBalance = user.getBalance();

            if (userBalance.compareTo(skinPrice) >= 0) {
                Inventory inventoryItem = new Inventory();
                inventoryItem.setUserId(userId);
                inventoryItem.setSkinId(skinId);
                inventoryItem.setItemName(skin.getName());
                inventoryItem.setItemPrice(skinPrice);
                inventoryItem.setDescription(skin.getDescription());
                inventoryItem.setImg(skin.getImg());
                inventoryRepository.save(inventoryItem);

                Double updatedBalance = userBalance - skinPrice;
                user.setBalance(updatedBalance);
                userRepository.save(user);

                skinRepository.delete(skin);
            } else {
                throw new InsufficientBalanceException("Insufficient balance to purchase the skin");
            }
        }
    }

    public List<GetSkinResponse> getUserInventory(Long userId) {
        List<Inventory> inventoryList = inventoryRepository.findByUserId(userId);

        return inventoryList.stream()
                .map(inventory -> new GetSkinResponse(
                        inventory.getSkinId(),
                        inventory.getItemName(),
                        inventory.getItemPrice(),
                        inventory.getDescription(),
                        inventory.getImg()
                ))
                .collect(Collectors.toList());
    }

    public void sellSkinFromInventory(Long userId, Long skinId){
        Optional<Inventory> inventoryOptional = inventoryRepository.findByUserIdAndSkinId(userId, skinId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (inventoryOptional.isPresent() && userOptional.isPresent()) {
            Inventory inventoryItem = inventoryOptional.get();
            User user = userOptional.get();

            Skin soldSkin = new Skin();
            soldSkin.setName(inventoryItem.getItemName());
            soldSkin.setPrice(inventoryItem.getItemPrice());
            soldSkin.setDescription(inventoryItem.getDescription());
            soldSkin.setImg(inventoryItem.getImg());

            skinRepository.save(soldSkin);
            inventoryRepository.delete(inventoryItem);

            Double updatedBalance = user.getBalance() + inventoryItem.getItemPrice();
            user.setBalance(updatedBalance);
            userRepository.save(user);
        }
    }

}
