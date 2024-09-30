package com.market.semester3.business;

public interface BlackjackManager {
    public double placeBet(Long userId, double betAmount);
    public double win(Long userId, double winningAmount);
}
