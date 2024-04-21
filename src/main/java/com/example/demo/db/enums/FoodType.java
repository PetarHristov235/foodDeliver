package com.example.demo.db.enums;

public enum FoodType {
    BURGER("BURGER"), SALAD("SALAD"), PIZZA("PIZZA"),
    SOUP("SOUP"), DESSERT("DESSERT"), DRINK("DRINK"), PASTA("PASTA");

    private final String displayName;

    FoodType(String displayName) {
        this.displayName = displayName;
    }

    public String displayName() {
        return this.displayName;
    }
}


