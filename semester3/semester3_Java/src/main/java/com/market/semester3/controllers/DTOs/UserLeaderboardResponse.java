package com.market.semester3.controllers.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserLeaderboardResponse {
    private Long user_id;
    private String userName;
    private long purchaseCount;
}
