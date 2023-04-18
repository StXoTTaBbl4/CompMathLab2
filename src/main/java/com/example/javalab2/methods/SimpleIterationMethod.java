package com.example.javalab2.methods;

import com.example.javalab2.functions.Function;

import java.util.ArrayList;

public class SimpleIterationMethod extends Method{
    double a,b,epsilon;
    String equation;
    /*
    0 столбец - итерация
    1 столбец - x/i/
    2 столбец - x/i+1/
    3 столбец - FI(x/i+1/)
    4 столбец - F(x/i+1/)
    5 столбец - |x/i+1/ - x/i/|
     */
    String[][]  table;
    Function function;

    ArrayList<String> i = new ArrayList<>();
    ArrayList<String> Xi = new ArrayList<>();
    ArrayList<String> Xip = new ArrayList<>();
    ArrayList<String> FIXip = new ArrayList<>();
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
            i.add(String.valueOf(count));

            System.out.println("x " + x);
            Xi.add(String.valueOf(x));

            x_next = x + lambda*function.calculate(x);
            System.out.println("x_next " + x_next);
            Xip.add(String.valueOf(x_next));

            System.out.println("FI(x_next) " + x_next + lambda*function.calculate(x_next));
            FIXip.add(String.valueOf(x_next + lambda*function.calculate(x_next)));

            System.out.println("F(x_next) " + function.calculate(x_next));
            FXip.add(String.valueOf(function.calculate(x_next)));

            System.out.println("|x_next - x| " + Math.abs(x_next-x));
            absDiff.add(String.valueOf(Math.abs(x_next-x)));

            if (Math.abs(x_next-x) < epsilon){
                table = new String[6][count];
                break;
            }

            x = x_next;
            count++;
        }


        System.out.println("======END OF CALCULATIONS======");

        table[0] = i.toArray(new String[count]);
        table[1] = Xi.toArray(new String[count]);
        table[2] = Xip.toArray(new String[count]);
        table[3] = FIXip.toArray(new String[count]);
        table[4] = FXip.toArray(new String[count]);
        table[5] = absDiff.toArray(new String[count]);
        return table;
    }
}
