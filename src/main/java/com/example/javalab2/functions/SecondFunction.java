package com.example.javalab2.functions;

public class SecondFunction extends Function{
    @Override
    public double calculate(double x) {
        return Math.pow(x,3)+3*Math.pow(x,2)+12*x+8;
    }

    @Override
    public double calculateFirstDerivative(double x) {
        return 3*Math.pow(x,2)+6*x+12;
    }
}
