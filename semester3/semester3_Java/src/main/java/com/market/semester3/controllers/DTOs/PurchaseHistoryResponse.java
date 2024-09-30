package com.market.semester3.controllers.DTOs;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class PurchaseHistoryResponse {
    Long skinId;
    String itemName;
    Double itemPrice;
    Timestamp purchaseDate;
}
