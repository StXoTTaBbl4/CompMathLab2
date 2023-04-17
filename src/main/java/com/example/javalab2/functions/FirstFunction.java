package com.example.javalab2.functions;

public class FirstFunction extends Function {
    @Override
    public double calculate(double x){
        return  Math.pow(x,3) - x + 4;
    }

    @Override
    public double calculateFirstDerivative(double x) {
        return 3*Math.pow(x,2)-1;
    }
}
