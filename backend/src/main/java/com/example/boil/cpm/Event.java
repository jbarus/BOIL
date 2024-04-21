package com.example.boil.cpm;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@ToString
public class Event {
    @JsonIgnore
    @ToString.Exclude
    List<Event> next = new ArrayList<>();
    @JsonIgnore
    @ToString.Exclude
    List<Event> previous = new ArrayList<>();
    String name;
    double start;
    double finish;
    double loose;

    public Event(String name) {
        this.name = name;
    }
}
