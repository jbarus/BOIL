package com.example.boil.cpm;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Activity{
    int id;
    String name;
    int cost;
    String startId;
    String endId;

    public Activity(String name, int cost, String startId, String endId) {
        this.name = name;
        this.cost = cost;
        this.startId = startId;
        this.endId = endId;
    }
}