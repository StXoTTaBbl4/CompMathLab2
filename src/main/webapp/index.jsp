<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>WebLab4Front</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="images/favicon.png">
    <link rel="stylesheet" href="CSS/w3.css">
    <script src="JS/calculator.js"></script>

    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="JS/lib/tex-mml-chtml.js"></script>
</head>
<body class="mat-typography">
<header class="w3-container w3-teal">
    <span class="w3-show-inline-block">
        <img src="images/fQDTLJ3zhzU.jpg" alt="logo" height="100px"/>
    </span>
    <span class="w3-show-inline-block">
        <h3>Лабораторная работа #2, Вариант #21, Румский А.М. Р32121</h3>
    </span>
</header>

<div class="w3-half w3-right" id="data">
    <div id="selected"></div>

    <div id="selectedOptions">
        <h2>Выберите метод:</h2>
        <div id="methodsWarning"></div>
        <div id="methods">
            <p>
                <input id="half" type="radio" value="half" checked name="method" class="Метод половинного деления method"/>
                <label for="half">Метод половинного деления</label>
            </p>

            <p>
                <input id="sec" type="radio" value="sec" name="method" class="Метод секущих method"/>
                <label for="sec">Метод секущих</label>
            </p>

            <p>
                <input id="iter" type="radio" value="iter" name="method" class="Метод простой итерации method"/>
                <label for="iter">Метод простой итерации</label>
            </p>

            <p>
                <input id="newton" type="radio" value="newton" name="method" class="Метод Ньютона(СУ) method"/>
                <label for="newton">Метод Ньютона(СУ)</label>
            </p>
    </div>

        <div id="equations">
        <h2>Выберите пример:</h2>
        <div id="equationsWarning"></div>

        <p>
            <input id="1" type="radio" value="1" checked name="equation" class="equation"/>
            <label for="1"> \(x^3 - x + 4 = 0\)</label>
        </p>

        <p>
            <input id="2" type="radio" value="2" name="equation" class="equation"/>
            <label for="2"> Метод секущих пример</label>
        </p>

        <p>
            <input id="3" type="radio" value="3" name="equation" class="equation"/>
            <label for="3"> Метод простой итерации пример</label>
        </p>

        <p>
            <input id="4" type="radio" value="4" name="equation" class="equation"/>
            <label for="4"> Система уравнений</label>
        </p>
    </div>

        <button id="submitMethodAndEquation">Выбрать</button>
    </div>

    <div id="initData" style="display: none">
        <div id="initDataWarning"></div>

        <div style="display: none" id="_a">
            <p id="aWarning" style='color: red'></p>
            <label for="a" >\(a_0\) </label>
            <input style="width: 90px" type="number" step="0.01" id="a" placeholder="-1">
        </div>

        <div style="display: none" id="_b">
            <p id="bWarning" style='color: red'></p>
            <label for="b">\(b_0\) </label>
            <input style="width: 90px" type="number" step="0.01" id="b" placeholder="1">
        </div>

        <div style="display: none" id="_epsilon">
            <p id="epsilonWarning" style='color: red'></p>
            <label for="epsilon">\(\varepsilon\) </label>
            <input style="width: 90px" type="number" max="0.9999" min="0.0001" id="epsilon" placeholder="0">
        </div>
        <button id="submitABX" style="margin-top: 20px">Вычислить</button>
    </div>
</div>

<div id="calculator" style="width: 800px; height: 600px;" class="w3-half w3-left"></div>
<!-- <div>
  <p>
    When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are
    \[\frac{\frac{1}{x}+\frac{1}{y}}{y-z}\]
  </p>

</div> -->

<footer class="w3-bottom w3-center w3-teal">
    <h3>All rights not reserved</h3><br>
    <%
        SimpleDateFormat formatter = new SimpleDateFormat("dd MMMM yyyy");
        out.println(formatter.format(Calendar.getInstance().getTime()));
    %>
</footer>

</body>
<script src="JS/lib/jquery-3.6.3.min.js"></script>
<script src="JS/main.js" ></script>
</html>