package com.example.boil.model;

public class MiddlemanRequest {
    private int[] supplies;
    private int[] demands;
    private int[][] profits;

    // Getters and setters
    public int[] getSupplies() {
        return supplies;
    }

    public void setSupplies(int[] supplies) {
        this.supplies = supplies;
    }

    public int[] getDemands() {
        return demands;
    }

    public void setDemands(int[] demands) {
        this.demands = demands;
    }

    public int[][] getProfits() {
        return profits;
    }

    public void setProfits(int[][] profits) {
        this.profits = profits;
    }
}
