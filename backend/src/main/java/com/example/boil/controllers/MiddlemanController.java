package com.example.boil.controllers;

import com.example.boil.cpm.Activity;
import com.example.boil.cpm.Event;
import com.example.boil.model.MiddlemanRequest;
import com.example.boil.model.MiddlemanResponse;
import com.example.boil.mp.MiddlemanProblem;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController()
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping(path="/api/v1/mp")
public class MiddlemanController {

    @PostMapping(path = "/middleman")
    public ResponseEntity<MiddlemanResponse> calculateCriticalPath(@RequestBody MiddlemanRequest request){
        MiddlemanProblem middlemanProblem = new MiddlemanProblem(request);
        MiddlemanResponse response = middlemanProblem.solve();
        return ResponseEntity.ok(response);
    }
}
