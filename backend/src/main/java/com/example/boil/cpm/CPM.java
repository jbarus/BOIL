package com.example.boil.cpm;

import lombok.Data;
import lombok.ToString;

import java.util.*;
import java.util.stream.Collectors;

public class CPM {
    private HashMap<String,Event> eventMap = new HashMap<>();
    private HashMap<String,Activity> activityMap = new HashMap<>();
    private int eventIdCounter = 0;
    private int activityIdCounter = 0;
    List<List<Event>> possiblePaths = new ArrayList<>();
    private Event start = null;
    private Event finish = null;

    public void addEvent(String name){
        Event event = new Event(name);
        if(start == null) {
            start = event;
            eventMap.put(name,event);
        }
        else
            eventMap.put(name,event);
    }

    /*public void addActivity(String name,int cost, String startName,String endName){
        if(eventMap.containsKey(startName)&&eventMap.containsKey(endName)){
            Activity activity = new Activity(name,cost,startName,endName);
            eventMap.get(startName).getNext().add(eventMap.get(endName));
            eventMap.get(endName).getPrevious().add(eventMap.get(startName));
            activityMap.put(startName+endName,activity);
        }else
            return;

    }*/

    public void addActivity(Activity activity){
        if(eventMap.containsKey(activity.getStartId())&&eventMap.containsKey(activity.getEndId())){
            activityMap.put(activity.getStartId()+activity.getEndId(),activity);
            eventMap.get(activity.getStartId()).getNext().add(eventMap.get(activity.getEndId()));
            eventMap.get(activity.getEndId()).getPrevious().add(eventMap.get(activity.getStartId()));
        }
    }

    public List<Event> solve(){
        findPaths();
        findStarts();
        findFinishes();
        findLooses();
        return List.copyOf(eventMap.values());
    }

    private void findLooses() {
        for(List<Event> list : possiblePaths){
            for (int i = 0; i < list.size(); i++) {
                list.get(i).setLoose(list.get(i).getFinish()-list.get(i).getStart());
            }
        }
    }

    private void findFinishes() {
        for(List<Event> list : possiblePaths){
            int finish = list.getLast().start;
            for (int i = list.size()-1; i > 0; i--) {
                list.get(i).setFinish(finish);
                finish -= activityMap.get(list.get(i-1).name+list.get(i).name).cost;
            }
        }
    }

    private void findStarts() {
        for(List<Event> list : possiblePaths){
            int start = 0;
            list.get(0).setStart(start);
            for (int i = 0; i < list.size()-1; i++) {
                start += activityMap.get(list.get(i).name+list.get(i+1).name).cost;
                list.get(i+1).setStart(start);
            }
        }
    }


    private void findPaths(){
        traverse(start, new ArrayList<>(),possiblePaths);
        List<List<Event>> temp = new ArrayList<>();
        HashMap<Integer,List<Event>> map = new HashMap<>();
        for(List<Event> list : possiblePaths){
            int totalCost  = 0;
            for (int i = 0; i < list.size() - 1; i++) {
                totalCost += activityMap.get(list.get(i).name+list.get(i+1).name).cost;
            }
            map.put(totalCost,list);
        }
        List<Map.Entry<Integer, List<Event>>> sortedEntries = new ArrayList<>(map.entrySet());
        sortedEntries.sort(Comparator.comparingInt(Map.Entry::getKey));
        for (Map.Entry<Integer, List<Event>> entry : sortedEntries) {
            temp.add(entry.getValue());
        }
        possiblePaths=temp;
    }


    private void traverse(Event start, List<Event> path, List<List<Event>> possiblePaths){
        Event startCopy = start;
        path.add(startCopy);
        if(startCopy.getNext().isEmpty()){
            possiblePaths.add(path);
        }
        for (int i = 0; i < startCopy.getNext().size(); i++) {
            traverse(startCopy.getNext().get(i),new ArrayList<>(path),possiblePaths);
        }

    }

    @Deprecated
    public void solveStartOld(){
        List<List<Event>> possiblePaths = new ArrayList<>();
        traverse(start, new ArrayList<>(),possiblePaths);
        List<HashMap<String,Integer>> starts = new ArrayList<>();
        for(List<Event> list : possiblePaths){
            int start = 0;
            HashMap<String,Integer> map = new HashMap<>();
            for (int i = 0; i < list.size(); i++) {
                map.put(list.get(i).name,start);
                if(i < list.size()-1)
                    start+=activityMap.get(list.get(i).name+list.get(i+1).name).cost;
            }
            starts.add(map);
        }


        // Wybieranie największej wartości start dla każdego Eventu
        HashMap<String, Integer> maxStartValues = new HashMap<>();
        for (HashMap<String, Integer> map : starts) {
            for (Map.Entry<String, Integer> entry : map.entrySet()) {
                String eventName = entry.getKey();
                int startValue = entry.getValue();
                if (!maxStartValues.containsKey(eventName) || startValue > maxStartValues.get(eventName)) {
                    maxStartValues.put(eventName, startValue);
                }
            }
        }

        // Przypisanie największych wartości start do oryginalnych Eventów
        for (Map.Entry<String, Integer> entry : maxStartValues.entrySet()) {
            String eventName = entry.getKey();
            int maxValue = entry.getValue();
            Event event = eventMap.get(eventName);
            event.setStart(maxValue);
        }
    }

    @Deprecated
    public void solveFinishOld() {
        List<List<Event>> possiblePaths = new ArrayList<>();
        traverse(start, new ArrayList<>(), possiblePaths);
        List<HashMap<String, Integer>> finishes = new ArrayList<>();
        for (List<Event> list : possiblePaths) {
            int finish = 0;
            HashMap<String, Integer> map = new HashMap<>();
            for (int i = list.size() - 1; i >= 0; i--) {
                map.put(list.get(i).name, finish);
                if (i > 0)
                    finish += activityMap.get(list.get(i - 1).name + list.get(i).name).cost;
            }
            finishes.add(map);
        }

        // Wybieranie największej wartości finish dla każdego Eventu
        HashMap<String, Integer> maxFinishValues = new HashMap<>();
        for (HashMap<String, Integer> map : finishes) {
            for (Map.Entry<String, Integer> entry : map.entrySet()) {
                String eventName = entry.getKey();
                int finishValue = entry.getValue();
                if (!maxFinishValues.containsKey(eventName) || finishValue > maxFinishValues.get(eventName)) {
                    maxFinishValues.put(eventName, finishValue);
                }
            }
        }

        // Przypisanie największych wartości finish do oryginalnych Eventów
        for (Map.Entry<String, Integer> entry : maxFinishValues.entrySet()) {
            String eventName = entry.getKey();
            int maxValue = entry.getValue();
            Event event = eventMap.get(eventName);
            event.setFinish(maxValue);
        }
    }
}
