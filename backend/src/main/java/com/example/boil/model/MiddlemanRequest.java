package com.example.boil.model;

import lombok.Data;

@Data
public class MiddlemanRequest {
    private int[] supplies;
    private int[] demands;
    private int[] sellPrice;
    private int[] purchasePrice;

    private int[][] transportPrice;
}
