package com.example.javalab2.methods;

import com.example.javalab2.functions.Function;

import java.util.ArrayList;

public class SimpleIterationMethod extends Method{
    double a,b,epsilon;
    String equation;
    /*
    0 столбец - итерация
    1 столбец - x/i-1/
    2 столбец - x/i/
    3 столбец - x/i+1/
    4 столбец - F(x/i+1/)
    5 столбец - |x/i+1/ - x/i/|
     */
    String[][]  table;
    Function function;

    ArrayList<String> i = new ArrayList<>();
    ArrayList<String> Xim = new ArrayList<>();
    ArrayList<String> Xi = new ArrayList<>();
    ArrayList<String> Xip = new ArrayList<>();
    ArrayList<String> FXip = new ArrayList<>();
    ArrayList<String> absDiff = new ArrayList<>();

    public SimpleIterationMethod(double a, double b, double epsilon, String equation) {
        this.a = a;
        this.b = b;
        this.epsilon = epsilon;
        this.equation = equation;
    }

    public String[][] getAnswer(){
        function = selectFunction(equation);

        double x = 0,x_next = 0,lambda;

        if (function.calculateFirstDerivative(a) > function.calculateFirstDerivative(b)) {
            lambda = -1 / function.calculateFirstDerivative(a);
            x = a;
        }
        else {
            lambda = -1 / function.calculateFirstDerivative(b);
            x = b;
        }

        int count = 0;
        while (true){
            System.out.println("=================");
            System.out.println("i " + count );
            System.out.println("x " + x);
            x_next = x + lambda*function.calculate(x);
            System.out.println("x_next " + x_next);
            System.out.println("FI(x_next) " + x_next + lambda*function.calculate(x_next));
            System.out.println("F(x_next) " + function.calculate(x_next));
            System.out.println("|x_next - x| " + Math.abs(x_next-x));

            if (Math.abs(x_next-x) < epsilon){
                break;
            }

            x = x_next;
            count++;
        }


        System.out.println("======END OF CALCULATIONS======");
        return table;
    }
}
