package com.market.semester3.persistence;

import com.market.semester3.persistence.entity.Skin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkinRepository extends JpaRepository<Skin, Long> {
    List<Skin> findByNameContainingIgnoreCase(String name);
}
