package com.example.javalab2.methods;

import com.example.javalab2.functions.FirstSystemOfFunctions;
import com.example.javalab2.functions.Function;
import com.example.javalab2.others.Deltas;

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

        int i = 0;
        while(true){
            System.out.println("======================" );
            System.out.println("xi " + xi);
            System.out.println("yi " + yi);
            a = function.calculateFirst(xi, yi);
            b = function.calculateSecond(xi, yi);
            System.out.println("a " + a);
            System.out.println("b " + b);

            d = function.calculateDeltaXY(d, a, b);
            System.out.println("dx " + d.x);
            System.out.println("dy " + d.y);

            x_prev = xi;
            y_prev = yi;

            xi = xi + d.x;
            yi = yi + d.y;

            System.out.println("xi_new " + xi);
            System.out.println("yi_new " + yi);

            if((Math.abs(xi - x_prev) <= epsilon) || (Math.abs(yi - y_prev) <= epsilon)){
                break;
            }
            i++;
        }

        System.out.println("======END OF CALCULATIONS======");
        return table;
    }
}
