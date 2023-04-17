package com.example.javalab2.functions;

public class FirstSystemOfFunctions {

    static double x_0 = 1;
    static double y_0 = 2;

    public double calculateFirst(double x, double y){
        return 4 - Math.pow(x,2) - Math.pow(y,2);
    }
    public double calculateSecond(double x, double y){
        return 3*Math.pow(x,2) - y;
    }

    public double calculateDeltaX(double y){
        return (-1-4*y)/2;
    }
    public double calculateDeltaY(double x){
        return (-1-2*x)/4;
    }
//    public double calculateSecond_FirstDerivativeX(double x){
//        return x;
//    }
//    public double calculateSecond_FirstDerivativeY(double x){
//        return x;
//    }

}
