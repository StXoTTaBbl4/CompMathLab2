package com.example.javalab2.servlets;

import java.io.*;
import java.util.Arrays;

import com.example.javalab2.methods.HalfDivisionMethod;
import com.example.javalab2.methods.NewtonMethod;
import com.example.javalab2.methods.SecantMethod;
import com.example.javalab2.methods.SimpleIterationMethod;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "processServlet", value = "/process-servlet")
public class ProcessServlet extends HttpServlet {

    public void init() {}

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        System.out.println( "method " +  request.getParameter("method"));
        System.out.println( "equation " +  request.getParameter("equation"));
        System.out.println( "a " +  request.getParameter("a"));
        System.out.println( "b " +  request.getParameter("b"));
        System.out.println( "epsilon " +  request.getParameter("epsilon"));

        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        String[][] answer = null;
        String pack = "";
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();


        switch (request.getParameter("method")){
            case "half"->{
                HalfDivisionMethod method = new HalfDivisionMethod(Double.parseDouble(request.getParameter("a")),
                                                                    Double.parseDouble(request.getParameter("b")),
                                                                    Double.parseDouble(request.getParameter("epsilon")),request.getParameter("equation"));
                answer = method.getAnswer();
                System.out.println(Arrays.deepToString(answer));

                pack = Arrays.deepToString(answer);
                System.out.println("pack " + pack);
                out.println(pack);
            }
            case "sec"->{
                SecantMethod method = new SecantMethod(Double.parseDouble(request.getParameter("a")),
                        Double.parseDouble(request.getParameter("b")),
                        Double.parseDouble(request.getParameter("epsilon")),request.getParameter("equation"));
                answer = method.getAnswer();

                System.out.println(Arrays.deepToString(answer));

            }
            case "iter"->{
                SimpleIterationMethod method = new SimpleIterationMethod(Double.parseDouble(request.getParameter("a")),
                        Double.parseDouble(request.getParameter("b")),
                        Double.parseDouble(request.getParameter("epsilon")),request.getParameter("equation"));
                System.out.println(Arrays.deepToString(method.getAnswer()));
            }
            case "newton"->{
                NewtonMethod method = new NewtonMethod(Double.parseDouble(request.getParameter("x_0")),
                        Double.parseDouble(request.getParameter("y_0")),
                        Double.parseDouble(request.getParameter("epsilon")),request.getParameter("equation"));
                System.out.println(Arrays.deepToString(method.getAnswer()));
            }
            default -> {
                System.out.println("Нема такого метода");
            }
        }



    }

    public void destroy() {
    }
}