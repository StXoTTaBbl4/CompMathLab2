const elt = document.getElementById('calculator');
const calculator = Desmos.GraphingCalculator(elt, {expressions: false, keypad: false});
let selectedMethod = "";
let selectedEquation = "";
let selectedMethodName = "";
let selectedEquationName = "";
let a = "none";
let b = "none";
let x_0 = "none";
let y_0 = "none";
let epsilon = "none";


$(document).ready(function(){
    // calculator.setExpression({ id: 'graph1', latex: 'y=x^3-x+4' });
    calculator.setExpression({
        id: "test_point",
        type: "expression",
        latex: "(0,0)",
        pointStyle: "POINT",
        hidden: false,
        secret: false,
        // color: "#c74440",
        color: "gray",
        parametricDomain: {min: "0", max: "1"},

        label: "Я просто точка",
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
    console.log((selectedEquation == 4 && selectedMethod != "newton"));
    console.log((selectedEquation != 4 && selectedMethod == "newton"));
    if((selectedEquation == 4 && selectedMethod != "newton") || (selectedEquation != 4 && selectedMethod == "newton")) {
        console.log("системам системные методы");
        document.getElementById('methodsWarning').innerHTML = "<p style='color: red'>Метод не подходит для решения этого примера</p>";
        document.getElementById('equationsWarning').innerHTML = "<p style='color: red'>Пример не решается через данный метод!</p>";
        return;
    }

    document.getElementById('selected').innerHTML = "<h2>Выбранный метод: " + selectedMethodName + "</h2></br>"
        + "<h2>Выбранное уравнение: " + selectedEquationName + "</h2>";
    MathJax.typeset();

    document.getElementById('selectedOptions').style.display="none";
    document.getElementById('initData').style.display="block";



    switch (selectedEquation) {
        case "1":{
            calculator.setExpression({ id: 'graph1', latex: 'y=x^3-x+4', color: "green"  });
             break;
        }
        case "2":{
            calculator.setExpression({id: 'graph1', latex: 'y=x^3+3*x^2+12*x+8', color: "green"  });
            break;
        }
        case "3":{
            calculator.setExpression({
                id: "1",
                type: "expression",
                latex: "(1,2)",
                pointStyle: "POINT",
                hidden: false,
                secret: false,
                color: "red",
                parametricDomain: {min: "0", max: "1"},

                label: "Заглушка",
                showLabel: true
            });
            break;
        }
        case "4":{
            calculator.setExpression({ id: 'graph1', latex: 'y^2=4-x^2', color: "green"  });
            calculator.setExpression({ id: 'graph2', latex: 'y=3x^2', color: "blue"  });
            break;
        }
    }

    if (selectedMethod != "newton"){
        document.getElementById('_a').style.display = "block";
        document.getElementById('_b').style.display = "block";
        document.getElementById('_epsilon').style.display = "block";
    }
    else{
        document.getElementById('_x_0').style.display = "block";
        document.getElementById('_y_0').style.display = "block";
        document.getElementById('_epsilon').style.display = "block";
    }
})



$('#submitABX').on('click',function (){
    document.getElementById('aWarning').innerText = "";
    document.getElementById('bWarning').innerText = "";
    document.getElementById('epsilonWarning').innerHTML = "";
    document.getElementById('initDataWarning').innerHTML = "";
    document.getElementById('x_0Warning').innerHTML = "";
    document.getElementById('y_0Warning').innerHTML = "";

    console.log("a " + a + " b " + b + " epsilon " + epsilon);
    if (selectedMethod == "half" || selectedMethod == "sec" || selectedMethod == "iter"){



        if (a == "none" || a == ""){
            document.getElementById('aWarning').innerText = "Введите левую границу";
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

        if (checkRange(a,b,selectedEquation) == false){
            document.getElementById('initDataWarning').innerHTML = "На данном отрезке не существует корней";
        }

        console.log("method=" + selectedMethod + "&equation="+selectedEquation + "&a="+a + "&b="+b + "&epsilon=" + epsilon);
        $.ajax({

            url: 'process-servlet',
            method: "GET",
            data: "method=" + selectedMethod + "&equation="+selectedEquation + "&a="+a + "&b="+b + "&epsilon=" + epsilon,
            dataType: "html",

            success: function(msg){
                console.log(msg);
                console.log(JSON.parse(msg));

                let data = JSON.parse(msg);

                let table = document.querySelector('#table');

                generateNames(table);

                for (let subArr of data) {
                    let tr = document.createElement('tr');

                    for (let elem of subArr) {
                        let td = document.createElement('td');
                        td.textContent = elem;
                        tr.appendChild(td);
                    }

                    table.appendChild(tr);
                }
            },
            error: function(error){
                console.log("Data receive error");
                console.log(error);
            },
        })
    }

    else if(selectedMethod == "newton"){
        if (x_0 == "none" || x_0 == ""){
            document.getElementById('aWarning').innerText = "Введите левую границу";
            return;
        }
        if (y_0 == "none" || y_0 == ""){
            document.getElementById('aWarning').innerText = "Введите левую границу";
            return;
        }

        console.log("method=" + selectedMethod + "&equation="+selectedEquation + "&x_0="+ x_0 + "&y_0="+ y_0 + "&epsilon=" + epsilon);
        $.ajax({
            url: 'process-servlet',
            method: "GET",
            data: "method=" + selectedMethod + "&equation="+selectedEquation + "&x_0="+x_0 + "&y_0="+ y_0 + "&epsilon=" + epsilon,
            dataType: "html",

            success: function(msg){
                console.log(msg);
            },
            error: function(error){
                console.log("Data receive error");
                console.log(error);
            }
        })
    }
})

$('#a').on('input',function (){
    a = document.getElementById('a').value;
    console.log("a "+ a);
});
$('#b').on('input',function (){
    b = document.getElementById('b').value;
    console.log("b "+ b);
});
$('#x_0').on('input',function (){
    x_0 = document.getElementById('x_0').value;
    console.log("x_0 " + x_0);
});
$('#y_0').on('input',function (){
    y_0 = document.getElementById('y_0').value;
    console.log("y_0 " + y_0);
});
$('#epsilon').on('input',function (){
    epsilon = document.getElementById('epsilon').value;
    console.log("epsilon " + epsilon);
});

function generateNames(table) {
    switch (selectedEquation){
        case "1":{
            let tr = document.createElement('tr');

            let th = document.createElement('th');
            th.textContent = "i";
            tr.appendChild(th);

            th.textContent = "i";
            tr.appendChild(th);

            th.textContent = "i";
            tr.appendChild(th);

            th.textContent = "i";
            tr.appendChild(th);

            th.textContent = "i";
            tr.appendChild(th);

        }
        case "2":{

        }
        case "3":{

        }
        case "4":{

        }

    }
}