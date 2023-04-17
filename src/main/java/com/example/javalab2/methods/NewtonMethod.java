package com.example.javalab2.methods;

import com.example.javalab2.functions.Function;

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
    Function function;

    public String[][] getAnswer(){



        return table;
    }
}
