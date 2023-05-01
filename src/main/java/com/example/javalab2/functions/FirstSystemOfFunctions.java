package com.example.javalab2.functions;

import com.example.javalab2.others.Deltas;

public class FirstSystemOfFunctions {

    public double calculateFirst(double x, double y){
        return 4 - Math.pow(x,2) - Math.pow(y,2);
    }
    public double calculateSecond(double x, double y){
        return 3*Math.pow(x,2) - y;
    }

    public Deltas calculateDeltaXY(Deltas d, double a, double b){
        d.x = (a - 4*b)/26;
        d.y = b + 6*d.x;

        return d;
    }
//    public double calculateSecond_FirstDerivativeX(double x){
//        return x;
//    }
//    public double calculateSecond_FirstDerivativeY(double x){
//        return x;
//    }

}
