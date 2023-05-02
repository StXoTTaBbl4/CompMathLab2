package com.example.javalab2.functions;

public class ThirdFunction extends Function{
    @Override
    public double calculate(double x) {
        return Math.pow(0.5,x);
    }

    @Override
    public double calculateFirstDerivative(double x) {
        return -Math.log(2)/Math.pow(2,x);
    }
}
