package com.example.boil.cpm;

import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@ToString
class Event{
    @ToString.Exclude
    List<Event> next = new ArrayList<>();
    @ToString.Exclude
    List<Event> previous = new ArrayList<>();
    String name;
    int id;
    int start;
    int finish;
    int loose;

    public Event(String name) {
        this.name = name;
    }
}
