package com.example.boil.model;

import lombok.Data;

@Data
public class MiddlemanResponse {
    private int[][] optimalSolution;
    private int[][] individualProfit;
    private int totalCost;
    private int totalIncome;
    private int totalProfit;
}
