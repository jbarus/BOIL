package com.example.boil.cpm;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Activity{
    int id;
    String name;
  //  @JsonProperty("time")
    int cost;
  //  @JsonProperty("start")
    String startId;
  //  @JsonProperty("end")
    String endId;

    public Activity(String name, int cost, String startId, String endId) {
        this.name = name;
        this.cost = cost;
        this.startId = startId;
        this.endId = endId;
    }
}