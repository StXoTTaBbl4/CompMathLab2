package com.example.javalab2.methods;

import com.example.javalab2.functions.FirstSystemOfFunctions;
import com.example.javalab2.functions.Function;
import com.example.javalab2.others.Deltas;

import java.util.ArrayList;

public class NewtonMethod extends Method{
    String equation;
    /*
0 столбец - итерация
1 столбец - x/i-1/
2 столбец - x/i/
3 столбец - x/i+1/
4 столбец - F(x/i+1/)
5 столбец - |x/i+1/ - x/i/|
 */
    ArrayList<String> i = new ArrayList<>();
    ArrayList<String> Xi = new ArrayList<>();
    ArrayList<String> Yi = new ArrayList<>();
    ArrayList<String> dXi = new ArrayList<>();
    ArrayList<String> dYi = new ArrayList<>();
    ArrayList<String> absDiffX = new ArrayList<>();
    ArrayList<String> absDiffY = new ArrayList<>();
    String[][]  table;

    double xi,yi, epsilon;

    public NewtonMethod( double xi, double yi, double epsilon, String equation) {
        this.xi = xi;
        this.yi = yi;
        this.epsilon = epsilon;
        this.equation = equation;

        System.out.println( xi + " " + yi + " " + epsilon + " " + equation);
    }

    FirstSystemOfFunctions function = new FirstSystemOfFunctions();
    public String[][] getAnswer(){
        double x_prev = 0, y_prev = 0, a = 0, b = 0;
        Deltas d = new Deltas();

        int count = 0;
        while(true){
            System.out.println("======================" );
            System.out.println("iter " + i);
            i.add(String.valueOf(count));

            System.out.println("xi " + xi);
            Xi.add(String.valueOf(xi));

            System.out.println("yi " + yi);
            Yi.add(String.valueOf(yi));

            a = function.calculateFirst(xi, yi);
            b = function.calculateSecond(xi, yi);
            System.out.println("a " + a);
            System.out.println("b " + b);

            d = function.calculateDeltaXY(d, a, b);
            System.out.println("dx " + d.x);
            dXi.add(String.valueOf(d.x));
            System.out.println("dy " + d.y);
            dYi.add(String.valueOf(d.y));

            x_prev = xi;
            y_prev = yi;

            xi = xi + d.x;
            yi = yi + d.y;

            System.out.println("xi_new " + xi);
            System.out.println("yi_new " + yi);

            absDiffX.add(String.valueOf(Math.abs(xi - x_prev)));
            absDiffY.add(String.valueOf(Math.abs(yi - y_prev)));

            if((Math.abs(xi - x_prev) <= epsilon) || (Math.abs(yi - y_prev) <= epsilon)){
                table = new String[7][count];
                break;
            }
            count++;
        }

        table[0] = i.toArray(new String[count]);
        table[1] = Xi.toArray(new String[count]);
        table[2] = Yi.toArray(new String[count]);
        table[3] = dXi.toArray(new String[count]);
        table[4] = dYi.toArray(new String[0]);
        table[5] = absDiffX.toArray(new String[0]);
        table[6] = absDiffY.toArray(new String[0]);

        System.out.println("======END OF CALCULATIONS======");
        return table;
    }
}
