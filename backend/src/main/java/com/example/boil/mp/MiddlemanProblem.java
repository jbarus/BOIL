package com.example.boil.mp;

import com.example.boil.model.MiddlemanRequest;
import com.example.boil.model.MiddlemanResponse;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MiddlemanProblem {
    int[][] profits;
    int[] supplies;
    int[] demands;
    int[][] solution;
    int[] v;
    int[] u;
    int[][] penalties;

    int[] sellPrice;

    int[] purchasePrice;

    int[][] transportPrice;

    public MiddlemanProblem(MiddlemanRequest request) {
        profits = new int[request.getTransportPrice().length][request.getTransportPrice()[0].length];
        for (int i = 0; i < profits.length; i++) {
            for (int j = 0; j < profits[0].length; j++) {
                profits[i][j] = request.getSellPrice()[j] - request.getTransportPrice()[i][j] - request.getPurchasePrice()[i];
            }
        }
        this.supplies = request.getSupplies();
        this.demands = request.getDemands();
        solution = new int[profits.length][profits[0].length];
        u=new int[profits.length];
        v=new int[profits[0].length];
        Arrays.fill(v, Integer.MAX_VALUE);
        Arrays.fill(u, Integer.MAX_VALUE);
        penalties = new int[profits.length][profits[0].length];
        sellPrice = request.getSellPrice();
        purchasePrice = request.getPurchasePrice();
        transportPrice = request.getTransportPrice();
    }

    public MiddlemanResponse solve(){
        //Stage 1 - Find a first feasible solution
        if(Arrays.stream(supplies).sum() != Arrays.stream(demands).sum())
            addFSandFD();
        findFeasibleSolution();
        //Stage 2 -
        calculateVandU();
        //Stage 3 -
        calculatePenalties();
        //Stage 4 -
        System.out.println("Dupa");
        while (true){
            int[] max = findMaximumPenalty(penalties);
            if(penalties[max[0]][max[1]]<=0)
                break;
            List<int[]> coordinates = findLoop(max[0],max[1]);
            int min = Math.min(solution[coordinates.get(1)[0]][coordinates.get(1)[1]],solution[coordinates.get(3)[0]][coordinates.get(3)[1]]);
            solution[coordinates.get(0)[0]][coordinates.get(0)[1]] += min;
            solution[coordinates.get(1)[0]][coordinates.get(1)[1]] -=min;
            solution[coordinates.get(2)[0]][coordinates.get(2)[1]] += min;
            solution[coordinates.get(3)[0]][coordinates.get(3)[1]] -= min;
            calculateVandU();
            calculatePenalties();
        }

        int[][] individualProfit = new int[solution.length][solution[0].length];
        int totalCost = 0;
        int totalIncome = 0;
        int totalProfit = 0;
        for (int i = 0; i < solution.length-1; i++) {
            for (int j = 0; j < solution[0].length-1; j++) {
                individualProfit[i][j] = profits[i][j]*solution[i][j];
                totalCost += transportPrice[i][j]*solution[i][j]+purchasePrice[i]*solution[i][j];
                totalIncome += solution[i][j]*sellPrice[j];
                totalProfit += individualProfit[i][j];
            }
        }
        MiddlemanResponse middlemanResponse = new MiddlemanResponse();
        middlemanResponse.setOptimalSolution(solution);
        middlemanResponse.setTotalCost(totalCost);
        middlemanResponse.setTotalIncome(totalIncome);
        middlemanResponse.setTotalProfit(totalProfit);
        middlemanResponse.setIndividualProfit(individualProfit);
        return middlemanResponse;
    }

    private void addFSandFD() {
        int[][] newProfits = new int[profits.length+1][profits[0].length+1];
        for (int i = 0; i < profits.length; i++) {
            System.arraycopy(profits[i], 0, newProfits[i], 0, profits[0].length);
        }
        profits = newProfits;

        int[] newDemands = new int[demands.length+1];
        System.arraycopy(demands, 0, newDemands, 0, demands.length);
        newDemands[newDemands.length-1]= Arrays.stream(supplies).sum();

        int[] newSupplies = new int[supplies.length+1];
        System.arraycopy(supplies, 0, newSupplies, 0, supplies.length);
        newSupplies[newSupplies.length-1]= Arrays.stream(demands).sum();

        demands = newDemands;
        supplies = newSupplies;

        solution = new int[solution.length+1][solution[0].length+1];
        penalties = new int[profits.length][profits[0].length];

        u=new int[profits.length];
        v=new int[profits[0].length];

        Arrays.fill(v, Integer.MAX_VALUE);
        Arrays.fill(u, Integer.MAX_VALUE);

        int[] newSellPrice = new int[sellPrice.length+1];
        System.arraycopy(sellPrice, 0, newSellPrice, 0, sellPrice.length);

        int[] newPurchasePrice = new int[purchasePrice.length+1];
        System.arraycopy(purchasePrice, 0, newPurchasePrice, 0, purchasePrice.length);

        sellPrice = newSellPrice;
        purchasePrice = newPurchasePrice;

        int[][] newTransportPrice = new int[transportPrice.length+1][transportPrice[0].length+1];
        for (int i = 0; i < transportPrice.length; i++) {
            System.arraycopy(transportPrice[i], 0, newTransportPrice[i], 0, transportPrice[0].length);
        }
        transportPrice = newTransportPrice;
    }

    private List<int[]> findLoop(int x, int y) {
        List<int[]> loop = new ArrayList<>();

        if (y - 1 >= 0 && x - 1 >= 0) {
            if (solution[x][y - 1] > 0 && solution[x - 1][y - 1] > 0 && solution[x - 1][y] > 0) {
                loop.add(new int[]{x, y});
                loop.add(new int[]{x, y - 1});
                loop.add(new int[]{x - 1, y - 1});
                loop.add(new int[]{x - 1, y});
                return loop;
            }
        }

        if (y + 1 < solution[0].length && x - 1 >= 0) {
            if (solution[x - 1][y] > 0 && solution[x - 1][y + 1] > 0 && solution[x][y + 1] > 0) {
                loop.add(new int[]{x, y});
                loop.add(new int[]{x - 1, y});
                loop.add(new int[]{x - 1, y + 1});
                loop.add(new int[]{x, y + 1});
                return loop;
            }
        }

        if (y + 1 < solution[0].length && x + 1 < solution.length) {
            if (solution[x][y + 1] > 0 && solution[x + 1][y + 1] > 0 && solution[x + 1][y] > 0) {
                loop.add(new int[]{x, y});
                loop.add(new int[]{x, y + 1});
                loop.add(new int[]{x + 1, y + 1});
                loop.add(new int[]{x + 1, y});
                return loop;
            }
        }

        if (y - 1 >= 0 && x + 1 < solution.length) {
            if (solution[x + 1][y] > 0 && solution[x + 1][y - 1] > 0 && solution[x][y - 1] > 0) {
                loop.add(new int[]{x, y});
                loop.add(new int[]{x + 1, y});
                loop.add(new int[]{x + 1, y - 1});
                loop.add(new int[]{x, y - 1});
                return loop;
            }
        }

        return loop;
    }

    /*private int[] findLoop(int x, int y) {
        if (y - 1 >= 0 && x - 1 >= 0)
            if (solution[x][y - 1] > 0 && solution[x - 1][y - 1] > 0 && solution[x - 1][y] > 0)
                return new int[]{x, y, x, y - 1, x - 1, y - 1, x - 1, y};
        if (y + 1 < solution[0].length && x - 1 >= 0)
            if (solution[x - 1][y] > 0 && solution[x - 1][y + 1] > 0 && solution[x][y + 1] > 0)
                return new int[]{x, y, x - 1, y, x - 1, y + 1, x, y + 1};
        if (y + 1 < solution[0].length && x + 1 < solution.length)
            if (solution[x][y + 1] > 0 && solution[x + 1][y + 1] > 0 && solution[x + 1][y] > 0)
                return new int[]{x, y, x, y + 1, x + 1, y + 1, x + 1, y};
        if (y - 1 >= 0 && x + 1 < solution.length)
            if (solution[x + 1][y] > 0 && solution[x + 1][y - 1] > 0 && solution[x][y - 1] > 0)
                return new int[]{x, y, x + 1, y, x + 1, y - 1, x, y - 1};
        return new int[]{};
    }*/

   /* public List<int[]> findLoop(int x, int y) {
        List<int[]> path = new ArrayList<>();
        boolean[][] visited = new boolean[solution.length][solution[0].length];
        if (dfs(x, y, x, y, path, visited)) {
            return path;
        } else {
            return new ArrayList<>();
        }
    }

    private boolean dfs(int startX, int startY, int x, int y, List<int[]> path, boolean[][] visited) {
        if (x < 0 || x >= solution.length || y < 0 || y >= solution[0].length) {
            return false;
        }

        path.add(new int[]{x, y});
        visited[x][y] = true;

        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        for (int[] dir : directions) {
            int newX = x + dir[0];
            int newY = y + dir[1];

            if (newX == startX && newY == startY && path.size() >= 4) {
                // We've formed a loop
                path.add(new int[]{newX, newY});
                return true;
            }

            if (newX >= 0 && newX < solution.length && newY >= 0 && newY < solution[0].length
                    && !visited[newX][newY] && (solution[newX][newY] > 0 || (newX == startX && newY == startY))) {
                if (dfs(startX, startY, newX, newY, path, visited)) {
                    return true;
                }
            }
        }

        path.remove(path.size() - 1);
        visited[x][y] = false;
        return false;
    }*/

    private int[] findMaximumPenalty(int[][] penalties) {
        int max = 0;
        int iMax = 0;
        int jMax = 0;
        for (int i = 0; i < penalties.length; i++) {
            for (int j = 0; j < penalties[0].length; j++) {
                if(penalties[i][j]>max){
                    iMax = i;
                    jMax = j;
                    max = penalties[i][j];
                }
            }
        }
        return new int[]{iMax,jMax};
    }

    private void calculatePenalties() {
        for (int[] penalty : penalties) {
            Arrays.fill(penalty, 0);
        }
        for (int i = 0; i < u.length; i++) {
            for (int j = 0; j < v.length; j++) {
                if(solution[i][j] == 0){
                    penalties[i][j]=profits[i][j]-(u[i]+v[j]);
                }
            }
        }
    }

    private void calculateVandU() {
        Arrays.fill(v, Integer.MAX_VALUE);
        Arrays.fill(u, Integer.MAX_VALUE);
        if(countAllocatedCells(solution) != solution.length+solution[0].length-1)
            throw new RuntimeException("m+n-1>usedCells in V and U calculation");
        u[0] = 0;
        do {
            for (int i = 0; i < u.length; i++) {
                for (int j = 0; j < v.length; j++) {
                    if(solution[i][j] != 0 && (u[i]!=Integer.MAX_VALUE || v[j]!=Integer.MAX_VALUE)){
                        if(u[i]==Integer.MAX_VALUE)
                            u[i]= profits[i][j]-v[j];
                        if(v[j]==Integer.MAX_VALUE)
                            v[j]= profits[i][j]-u[i];
                    }
                }
            }
        }while(containsIntMax(v) || containsIntMax(u));
    }

    private boolean containsIntMax(int[] arr) {
        return Arrays.stream(arr).anyMatch(i-> i==Integer.MAX_VALUE);
    }

    private int countAllocatedCells(int[][] arr) {
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[0].length; j++) {
                if(arr[i][j]!=0)
                    sum +=1;
            }
        }
        return sum;
    }

    private void findFeasibleSolution() {
        do {
            int[] max = findMaximumProfit(profits);
            int actualDemand = Math.min(supplies[max[0]],demands[max[1]]);
            supplies[max[0]] -= actualDemand;
            demands[max[1]]  -= actualDemand;
            solution[max[0]][max[1]] = actualDemand;
        }while (sum(demands) != 0 && sum(supplies) != 0);
    }

    private int[] findMaximumProfit(int[][] arr){
        int iMax = 0;
        int jMax = 0;
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[0].length; j++) {
                if(arr[i][j] > max && supplies[i]!=0 &&demands[j]!=0){
                    if(i == supplies.length-1 && Arrays.stream(supplies).sum()-supplies[supplies.length-1] != 0)
                        continue;
                    if(j == demands.length-1 && Arrays.stream(demands).sum()-demands[demands.length-1] != 0)
                        continue;
                    iMax = i;
                    jMax = j;
                    max= profits[i][j];
                }
            }
        }
        return new int[]{iMax,jMax};
    }

    private int sum(int[] arr) {
        return Arrays.stream(arr).sum();
    }
}
