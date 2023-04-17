package com.example.javalab2.methods;

import com.example.javalab2.functions.FirstFunction;
import com.example.javalab2.functions.Function;

public class HalfDivisionMethod extends Method{
    double a,b,epsilon;
    long iterations;
    String equation;
    /*
    0 столбец - итерация
    1 столбец - a
    2 столбец - b
    3 столбец - x
    4 столбец - F(a)
    5 столбец - F(b)
    6 столбец - F(x)
    7 столбец - |a-b|
     */
    String[][]  table;
    Function function;

    public HalfDivisionMethod(double a, double b, double epsilon, String equation) {
        this.a = a;
        this.b = b;
        this.epsilon = epsilon;
        this.equation = equation;
    }

    public String[][] getAnswer(){
        function = selectFunction(equation);
        iterations = Math.round(Math.log(Math.abs((a-b))/epsilon)/Math.log(2))+1;
        System.out.println("Iterations:" + iterations);
        table = new String[(int) iterations][8];
        double x, fa, fb, fx, absDifAB;
        for (int i = 0; i < iterations; i++){
            System.out.println("=======================");

            table[i][0] = String.valueOf(i);
            table[i][1] = String.valueOf(a);
            table[i][2] = String.valueOf(b);

            System.out.println("i " + i);
            System.out.println("a " + a);
            System.out.println("b " + b);

            x = (a+b)/2.0d;
            fa = function.calculate(a);
            fb = function.calculate(b);
            fx = function.calculate(x);

            table[i][3] = String.valueOf(x);
            table[i][4] = String.valueOf(fa);
            table[i][5] = String.valueOf(fb);
            table[i][6] = String.valueOf(fx);

            System.out.println("x " + x);
            System.out.println("fa " + fa);
            System.out.println("fb " + fb);
            System.out.println("fx " + fx);

            System.out.println("        fa*fx " + fa*fx);
            if(fa*fx > 0){
                System.out.println("        a=x");
                a = x;
            }else {
                System.out.println("        b=x");
                b = x;
            }

            absDifAB = Math.abs(a-b);
            table[i][7] = String.valueOf(absDifAB);

            System.out.println("|a-b| " + absDifAB);

            if (absDifAB <= epsilon ){
                // || Math.abs(function.calculate(x)) < epsilon - есть на блоксхеме, но тогда не сходится с примером
                x = (a+b)/2;
                table[i][3] = String.valueOf(x);
                System.out.println("final x " + (a+b)/2);
                System.out.println("======END OF CALCULATIONS======");
                return table;
            }

        }
        System.out.println("======END OF CALCULATIONS======");
        return table;
    }


}
