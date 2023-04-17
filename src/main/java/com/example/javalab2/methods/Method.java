package com.example.javalab2.methods;

import com.example.javalab2.functions.FirstFunction;
import com.example.javalab2.functions.Function;
import com.example.javalab2.functions.SecondFunction;

public abstract class Method {
    public Function selectFunction(String equation){
        switch (equation){
            case "1" ->{
                return new FirstFunction();
            }
            case "2" ->{
                return new SecondFunction();
            }
            default -> {
                return null;
            }
        }
    }
}
