let selectedMethod = "";
let selectedEquation = "";
let selectedMethodName = "";
let selectedEquationName = "";
let a = "none";
let b = "none";
let epsilon = "none"

$(document).ready(function(){
    const elt = document.getElementById('calculator');
    const calculator = Desmos.GraphingCalculator(elt, {expressions: false, keypad: false});

    calculator.setExpression({ id: 'graph1', latex: 'y=x^3-x+4' });
    calculator.setExpression({
        id: "1",
        type: "expression",
        latex: "(1,2)",
        pointStyle: "POINT",
        hidden: false,
        secret: false,
        color: "#c74440",
        parametricDomain: {min: "0", max: "1"},
        
        label: "my point",
        showLabel: true
      });

})

$("#submitMethodAndEquation").on('click',function (){
    document.getElementById('methodsWarning').innerHTML = "";
    document.getElementById('equationsWarning').innerHTML = "";

    let method = $('.method');
    selectedMethod = "none"
    for (let index = 0; index < method.length; index++) {
        if(method[index].checked){
            selectedMethod = method[index].value;
            selectedMethodName = method[index].value;
            break;
        }
    }

    let equation = $('.equation');
    selectedEquation = "none";
    for (let index = 0; index < equation.length; index++) {
        if(equation[index].checked){
            selectedEquation = equation[index].value;
            selectedEquationName = equation[index].value;
            break;
        }
    }

    console.log(selectedEquation +" " + selectedMethod);
    if((selectedEquation == 4 && selectedMethod != "newton") || (selectedEquation != 4 && selectedMethod == "newton")) {
        document.getElementById('methodsWarning').innerHTML = "<p style='color: red'>Метод не подходит для решения этого примера</p>";
        document.getElementById('equationsWarning').innerHTML = "<p style='color: red'>Пример не решается через данный метод!</p>";
    }

    document.getElementById('selected').innerHTML = "<h2>Выбранный метод: " + selectedMethodName + "</h2></br>"
        + "<h2>Выбранное уравнение: " + selectedEquationName + "</h2>";
    MathJax.typeset()

    document.getElementById('selectedOptions').style.display="none";
    document.getElementById('initData').style.display="block";

    if (selectedMethod == "half" || selectedMethod == "sec" || selectedMethod == "iter"){
        document.getElementById('_a').style.display = "block";
        document.getElementById('_b').style.display = "block";
        document.getElementById('_epsilon').style.display = "block";
    }
    // else{
    //     document.getElementById('_a').style.display = "block";
    //     document.getElementById('_b').style.display = "block";
    // }
})

$('#submitABX').on('click',function (){
    document.getElementById('aWarning').innerText = "";
    document.getElementById('bWarning').innerText = "";
    document.getElementById('epsilonWarning').innerHTML = "";
    document.getElementById('initDataWarning').innerHTML = "";

    console.log("a " + a + " b " + b + " epsilon " + epsilon);
    if (selectedMethod == "half" || selectedMethod == "sec" || selectedMethod == "iter"){

        if (a == "none" || a == ""){
            document.getElementById('aWarning').innerText = "Введите левую границу"
            return;
        }
        if (b == "none" || b == ""){
            document.getElementById('bWarning').innerText = "Введите правую границу";
            return;
        }
        if (epsilon == "none" || epsilon == ""){
            document.getElementById('epsilonWarning').innerText = "Введите точность";
            return;
        }
        if ((((a <= 0 && b >= 0) || (a <= 0 && b >= 0)) && (a >= b) || ((a < 0 && b < 0) && a <= b))){
            console.log(a >= b);
            document.getElementById('initDataWarning').innerHTML = "<p style='color: red'>Левая граница не может быть больше/равна правой!</p>";
            return;
        }

        console.log("method=" + selectedMethod + "&equation="+selectedEquation + "&a="+a + "&b="+b + "&epsilon=" + epsilon);
        $.ajax({

            url: 'process-servlet',
            method: "GET",
            data: "method=" + selectedMethod + "&equation="+selectedEquation + "&a="+a + "&b="+b + "&epsilon=" + epsilon,
            dataType: "html",

            success: function(msg){
                console.log(msg);
                // dots = JSON.parse(msg);
                // console.log(dots);
                // saveAllDots();
            },
            error: function(error){
                console.log("Data receive error");
                console.log(error);
            },
        })
    }
})

$('#a').on('input',function (){
    a = document.getElementById('a').value;
    console.log("a "+ a);
})
$('#b').on('input',function (){
    b = document.getElementById('b').value;
    console.log("b "+ b);
})
$('#x').on('input',function (){
    x = document.getElementById('x').value;
    console.log("x " + x);
})
$('#epsilon').on('input',function (){
    epsilon = document.getElementById('epsilon').value;
    console.log("epsilon " + epsilon);
})