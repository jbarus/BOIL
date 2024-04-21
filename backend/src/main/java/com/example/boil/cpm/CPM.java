package com.example.boil.cpm;

import java.util.*;

public class CPM {
    private HashMap<String,Event> eventMap = new HashMap<>();
    private HashMap<String,Activity> activityMap = new HashMap<>();
    private Event start = null;
    private Event end = null;

    public void addEvent(String name){
        Event event = new Event(name);
        if(start == null) {
            start = event;
            eventMap.put(name,event);
        }
        else{
            eventMap.put(name,event);
            end=event;
        }

    }

    public void addActivity(Activity activity){
        if(eventMap.containsKey(activity.getStartId()) && eventMap.containsKey(activity.getEndId())){
            activityMap.put(activity.getStartId()+activity.getEndId(),activity);
            eventMap.get(activity.getStartId()).getNext().add(eventMap.get(activity.getEndId()));
            eventMap.get(activity.getEndId()).getPrevious().add(eventMap.get(activity.getStartId()));
        }
    }

    public List<Event> calculate(){
        traverseForward(start);
        traverseBackward(end);
        calculateFinishes();
        return new ArrayList<>(eventMap.values());
    }

    private void calculateFinishes() {
        for (Event e : eventMap.values()){
            e.loose = e.finish-e.start;
        }
    }

    private void traverseBackward(Event end){
        if(!end.next.isEmpty()){
            findMinFinish(end);
        }
        else
            end.finish=end.start;
        for (int i = 0; i < end.getPrevious().size(); i++) {
            traverseBackward(end.getPrevious().get(i));
        }
    }

    private void findMinFinish(Event event) {
        event.finish = event.getNext().getFirst().finish - activityMap.get(event.name+event.getNext().getFirst().name).cost;
        for (int i = 0; i < event.getNext().size(); i++) {
            event.finish = Math.min(event.finish,event.getNext().get(i).finish - activityMap.get(event.name+event.getNext().get(i).name).cost);
        }
    }

    private void traverseForward(Event start) {
        if(!start.previous.isEmpty()){
            findMaxStart(start);
        }
        for (int i = 0; i < start.getNext().size(); i++) {
            traverseForward(start.getNext().get(i));
        }
    }

    private void findMaxStart(Event event){
        for (int i = 0; i < event.getPrevious().size(); i++) {
            event.start = Math.max(event.start,event.getPrevious().get(i).start+activityMap.get(event.getPrevious().get(i).name+event.name).cost);
        }
    }

}
