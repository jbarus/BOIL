package com.example.boil.cpm;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Activity {
    String name;
    double cost;
    String startId;
    String endId;

    public Activity(String name, double cost, String startId, String endId) {
        this.name = name;
        this.cost = cost;
        this.startId = startId;
        this.endId = endId;
    }
}