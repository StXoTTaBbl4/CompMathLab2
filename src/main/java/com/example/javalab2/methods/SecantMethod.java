package com.example.javalab2.methods;

import com.example.javalab2.functions.FirstFunction;
import com.example.javalab2.functions.Function;

import java.util.ArrayList;

public class SecantMethod extends Method{
    double a,b,epsilon;
    long iterations;
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

    //т.к нет изначально известного числа проходов - достаем костыли и поковыляли
    ArrayList<String> i = new ArrayList<>();
    ArrayList<String> Xim = new ArrayList<>();
    ArrayList<String> Xi = new ArrayList<>();
    ArrayList<String> Xip = new ArrayList<>();
    ArrayList<String> FXip = new ArrayList<>();
    ArrayList<String> absDiff = new ArrayList<>();

    public SecantMethod(double a, double b, double epsilon, String equation) {
        this.a = a;
        this.b = b;
        this.epsilon = epsilon;
        this.equation = equation;
    }

    public String[][] getAnswer(){
        function = selectFunction(equation);

        double x = 0,x_prev = 0,x_next = 0;

//        if (function.calculate(a)* function.secondDerivative(a) > 0) {
//            x = a;
//            x_prev = b;
//        }
//        else if (function.calculate(b)* function.secondDerivative(b) > 0) {
//            x = b;
//            x_prev = a;
//        }

        x_prev = a;
        x = b;

        int count = 0;
        while (true){
            x_next = x - (function.calculate(x)*(x - x_prev))/(function.calculate(x) - function.calculate(x_prev));

            System.out.println("========================");
            System.out.println("iter " + count);
            i.add(String.valueOf(count));
            System.out.println("x_prev " + x_prev);
            Xim.add(String.valueOf(x_prev));
            System.out.println("x " + x);
            Xi.add(String.valueOf(x));
            System.out.println("x_next " + x_next);
            Xip.add(String.valueOf(x_next));
            System.out.println("f(x_next) " + function.calculate(x_next));
            FXip.add(String.valueOf(function.calculate(x_next)));
            System.out.println("|x_next - x| " + Math.abs(x_next-x));
            absDiff.add(String.valueOf(Math.abs(x_next-x)));

            if (Math.abs(x - x_prev) < epsilon){
                table = new String[6][count];
                break;
            }
            x_prev = x;
            x = x_next;
            count++;

        }
        System.out.println("======END OF CALCULATIONS======");
        table[0] = i.toArray(new String[count]);
        table[1] = Xim.toArray(new String[count]);
        table[2] = Xi.toArray(new String[count]);
        table[3] = Xip.toArray(new String[count]);
        table[4] = FXip.toArray(new String[count]);
        table[5] = absDiff.toArray(new String[count]);
        return table;
    }



}
