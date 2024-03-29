package com.example.boil.controllers;

import com.example.boil.cpm.Activity;
import com.example.boil.cpm.CPM;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.boil.cpm.Event;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController()
@RequestMapping("/api/v1/cpm")
public class CPMController {

    @PostMapping(path = "/activity")
    public ResponseEntity<List<Event>> calculateCriticalPath(@RequestBody List<Activity> activities){
        Set<String> duplicates = new HashSet<>();
        CPM cpm = new CPM();
        for(Activity a : activities){
            if(duplicates.add(a.getStartId()))
                cpm.addEvent(a.getStartId());
            if(duplicates.add(a.getEndId()))
                cpm.addEvent(a.getEndId());
        }
        for (Activity a: activities){
            cpm.addActivity(a);
        }
        List<Event> events = cpm.solve();
        return ResponseEntity.ok(events);
    }
}
