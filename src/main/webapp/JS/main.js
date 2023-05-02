const elt = document.getElementById('calculator');
const calculator = Desmos.GraphingCalculator(elt, {expressions: false, keypad: false});
let selectedMethod = "";
let selectedEquation = "";

//Входные переменные
let a = "none";
let b = "none";
let x_0 = "none";
let y_0 = "none";
let epsilon = "none";

//Места для выводы предупреждений
let aWarning = document.getElementById('aWarning');
let bWarning = document.getElementById('bWarning');
let epsilonWarning = document.getElementById('epsilonWarning');
let initDataWarning = document.getElementById('initDataWarning');
let x_0Warning = document.getElementById('x_0Warning');
let y_0Warning = document.getElementById('y_0Warning');

//Инициализация для графиков ака костыль номер 0
$(document).ready(function(){
    // calculator.setExpression({ id: 'graph1', latex: 'y=x^3-x+4' });
    calculator.setExpression({
        id: "test_point",
        type: "expression",
        latex: "(0,0)",
        pointStyle: "POINT",
        hidden: false,
        secret: false,
        color: "gray",
        parametricDomain: {min: "0", max: "1"},

        label: "Я просто точка",
        showLabel: true
      });

        drawGraph("1");

})

//Отрисовка графика при переключении
$('.equation').on('click',function(){
    let equation = $('.equation');
    for (let index = 0; index < equation.length; index++) {
        if(equation[index].checked){
            selectedEquation = equation[index].value;
            break;
        }
    }
    drawGraph(selectedEquation)
})

//Выбор метода и примера, проверка их совместимости
$("#submitMethodAndEquation").on('click',function (){
    document.getElementById('methodsWarning').innerHTML = "";
    document.getElementById('equationsWarning').innerHTML = "";

    //Определение выбранного метода
    let method = $('.method');
    selectedMethod = "none"
    for (let index = 0; index < method.length; index++) {
        if(method[index].checked){
            selectedMethod = method[index].value;
            break;
        }
    }

    //Определение выбранного уравнения - old
    if(selectedEquation == "") {
        let equation = $('.equation');
        selectedEquation = "none";
        for (let index = 0; index < equation.length; index++) {
            if (equation[index].checked) {
                selectedEquation = equation[index].value;
                break;
            }
        }
    }

    // console.log(selectedEquation +" " + selectedMethod);
    // console.log((selectedEquation == 4 && selectedMethod != "newton"));
    // console.log((selectedEquation != 4 && selectedMethod == "newton"));
    //Определение корректности выбора пример-метод
    if((selectedEquation == 4 && selectedMethod != "newton") || (selectedEquation != 4 && selectedMethod == "newton")){
        console.log("системам системные методы");
        document.getElementById('methodsWarning').innerHTML = "<p style='color: red'>Метод не подходит для решения этого примера</p>";
        document.getElementById('equationsWarning').innerHTML = "<p style='color: red'>Пример не решается через данный метод!</p>";
        return;
    }

    //Вывод выбранных метода/уравнения
    document.getElementById('selected').innerHTML = "<h2>Выбранный метод: " + getMethodName(selectedMethod) + "</h2></br>"
        + "<h2>Выбранное уравнение: " + selectedEquation + "</h2>";
    MathJax.typeset();
    document.getElementById('selectedOptions').style.display="none";
    document.getElementById('initData').style.display="block";


    //Отрисовка графика в соответствии с выбранным примером - old
    drawGraph(selectedEquation);

    //Определение начальных параметров, основываясь на методе
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

//Отправка данных на обработку
$('#submitABX').on('click',function (){
    send_and_receive_data();
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

$('#input-file').on('change',function (evt){
     getFile(evt);
})
//В гробах вертятся n поколенй аккуратного кода давая энергию всему городу
$('#saveData').on('click',function (){

    let csv_data = [];

    let rows = document.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {

        let cols = rows[i].querySelectorAll('td,th');

        let csvrow = [];
        for (let j = 0; j < cols.length; j++) {
            csvrow.push(cols[j].innerHTML);
        }

        csv_data.push(csvrow.join(","));
    }
    csv_data = csv_data.join('\n');

    let CSVFile = new Blob([csv_data], { type: "text/csv" });


    let temp_link = document.createElement('a');


    temp_link.download = "data.csv";
    temp_link.href = window.URL.createObjectURL(CSVFile);

    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    temp_link.click();
    document.body.removeChild(temp_link);
})


//Чтение из файла
function getFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        placeFileContent(input.files[0])
    }
}
function placeFileContent( file) {
    readFileContent(file).then(content => {
        let fileContentArray = content.split(/\r\n|\n/)

        if (fileContentArray.length != 3){
            document.getElementById('loadWarning').innerText = "<p style='color: red'>Количество аргументов и строк - 3</p>";
        }else {
            if (!checkInput(fileContentArray)){
                document.getElementById('loadWarning').innerText = "<p style='color: red'>Количество аргументов и строк - 3</p>";
                return;
            }
            if (selectedMethod != "newton") {
                a = fileContentArray[0];
                b = fileContentArray[1];
            } else {
                x_0 = fileContentArray[0];
                y_0 = fileContentArray[1];
            }
            epsilon = fileContentArray[2];
            send_and_receive_data();
        }
    }).catch(error => console.log(error))

}
function readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
    })
}
function checkInput(input){
    let buff
    for (let i = 0; i < input.length; i++) {
        buff = input[i];
        if (buff.split(" ").length > 1){
            return false
        }
    }
    return true
}
//

//валидация/отправка/получение данных
function send_and_receive_data(){
    aWarning.innerText = "";
    bWarning.innerText = "";
    epsilonWarning.innerHTML = "";
    initDataWarning.innerHTML = "";
    initDataWarning.innerHTML = "";
    x_0Warning.innerHTML = "";
    y_0Warning.innerHTML = "";

    // console.log("a " + a + " b " + b + " epsilon " + epsilon);
    if (selectedMethod == "half" || selectedMethod == "sec" || selectedMethod == "iter"){

        if (a == "none" || a == ""){
            aWarning.innerText = "Введите левую границу";
            return;
        }
        if (b == "none" || b == ""){
            bWarning.innerText = "Введите правую границу";
            return;
        }
        if (epsilon == "none" || epsilon == ""){
            epsilonWarning.innerText = "Введите точность";
            return;
        }
        epsilon = Math.abs(epsilon);
        if ((((a <= 0 && b >= 0) || (a <= 0 && b >= 0)) && (a >= b) || ((a < 0 && b < 0) && a <= b))){
            console.log(a >= b);
            initDataWarning.innerHTML = "<p style='color: red'>Левая граница не может быть больше/равна правой!</p>";
            return;
        }

        a = Math.round(a*100000)/100000;
        b = Math.round(b*100000)/100000;

        if (checkRange(a,b,selectedEquation) == false){
            document.getElementById('initDataWarning').innerHTML = "На данном отрезке не существует корней";
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
                console.log(JSON.parse(msg));

                let data = JSON.parse(msg);
                if(selectedMethod != "half")
                    data = transpose(data);
                let names = getTableNames(selectedMethod);

                insertData(names);
                insertData(data);

                finalizeGraph(data);

                MathJax.typeset();


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

        if (epsilon == "none" || epsilon == ""){
            document.getElementById('epsilonWarning').innerText = "Введите точность";
            return;
        }
        epsilon = Math.abs(epsilon);

        x_0 = Math.round(x_0*100000)/100000;
        y_0 = Math.round(y_0*100000)/100000;

        console.log("method=" + selectedMethod + "&equation="+selectedEquation + "&x_0="+ x_0 + "&y_0="+ y_0 + "&epsilon=" + epsilon);
        $.ajax({
            url: 'process-servlet',
            method: "GET",
            data: "method=" + selectedMethod + "&equation="+selectedEquation + "&x_0="+x_0 + "&y_0="+ y_0 + "&epsilon=" + epsilon,
            dataType: "html",

            success: function(msg){
                console.log(msg);
                let data = JSON.parse(msg);
                data = transpose(data);
                let names = getTableNames(selectedMethod);

                insertData(names);
                insertData(data);

                finalizeGraph(data);

                MathJax.typeset();

            },
            error: function(error){
                console.log("Data receive error");
                console.log(error);
            }
        })
    }
}

//Заголовочные строки для таблицы
function getTableNames(method){
    switch (method){
        case "half":{
            return [["i","a","b","x","F(a)","F(b)","F(x)","\|a+b\|"]];
        }
        case "sec":{
            return [["i","\\(x_{i-1}\\)","\\(x_i\\)","\\(x_{i+1}\\)","\\(F(x_{i+1})\\)","\\(x_{i+1} - x_i\\)"]];
        }
        case "iter":{
            return [["i","\\(x_i\\)","\\(x_{i+1}\\)","\\(\\Phi(x_{i+1})\\)","\\(F(x_{i+1})\\)","\\(x_{i+1} - x_i\\)"]];
        }
        case "newton":{
            return [["i","\\(x_i\\)","\\(y_i\\)","\\(\\delta x\\)","\\(\\delta y\\)","\\(x_{i+1} - x_i\\)","\\(y_{i+1} - y_i\\)"]];
        }

    }
}

function getMethodName(raw){
    switch (raw) {
        case "half":
            return "Метод половинного деления"
        case "sec":
            return "Метод секущих"
        case "iter":
            return "Метод простой итерации"
        case "newton":
            return "Метод Ньютона(СУ)"
    }
}

//Транспонирование матрицы результатов работы(на стороне серва делать лень было)
function transpose(matrix) {
    return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

//наполнение таблицы данными
function insertData(data){
    let table = document.querySelector('#table');

    for (let subArr of data) {
        let tr = document.createElement('tr');

        for (let elem of subArr) {
            let td = document.createElement('td');
            td.textContent = (typeof elem === 'number' ? Math.round(elem*100000)/100000 : elem)
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}

//Рисует графики в соответствии с выбранным примером
function drawGraph(eq) {
    calculator.setBlank()

    switch (eq) {
        case "1":{
            calculator.setExpression({ id: 'graph', latex: 'y=x^3-x+4', color: "green"  });
            break;
        }
        case "2":{
            calculator.setExpression({id: 'graph', latex: 'y=x^3+3*x^2+12*x+8', color: "green"  });
            break;
        }
        case "3":{
            calculator.setExpression({ id: 'graph', latex: 'y=(0.5)^x', color: "green"  })
            // calculator.setExpression({
            //     id: "graph",
            //     type: "expression",
            //     latex: "(1,2)",
            //     pointStyle: "POINT",
            //     hidden: false,
            //     secret: false,
            //     color: "red",
            //     parametricDomain: {min: "0", max: "1"},
            //
            //     label: "Заглушка",
            //     showLabel: true
            // });
            break;
        }
        case "4":{
            calculator.setExpression({ id: 'graph', latex: 'y^2=4-x^2', color: "green"  });
            calculator.setExpression({ id: 'graph1', latex: 'y=3x^2', color: "blue"  });
            break;
        }
    }

}
let len;
//Финальный вид графика
function finalizeGraph(data){
    switch (selectedMethod) {
        case "half":
            drawLine('x='+data[0][1] ,"a");
            drawBorderDot("("+data[0][1]+",0)",'a_0');

            drawLine('x='+data[0][2] ,"b");
            drawBorderDot("("+data[0][2]+",0)",'b_0');

            drawLine('y='+data[0][4] ,"Fa" );
            drawBorderDot("(0,"+data[0][4]+")",'F(a)');

            drawLine('y='+data[0][5] ,"Fb");
            drawBorderDot("(0,"+data[0][5]+")",'F(b)');

            for (let i = 0; i < data[0].length-1; i++) {
                console.log(data[i][3])
                drawBorderDot("("+data[i][3]+",0)","x"+i)
            }

            break;
        case "sec":
            len = data.length -1
            drawBorderDot("("+data[len][1]+",0)",'x_(i-1)');
            drawBorderDot("("+data[len][2]+",0)",'x_i');
            drawBorderDot("("+data[len][3]+",0)",'x_(i+1)');

            break;
        case "iter":
            console.log("iter")
            len = data.length -1
            console.log(len)
            for (let i = 0; i < data.length; i++) {
                drawBorderDot("("+data[i][1]+","+data[i][2]+")",'M_'+i);
            }
            for (let i = 0; i < data.length; i++) {
                drawBorderDot("("+data[i][1]+","+data[i][1]+")",'N_'+i);
            }
            break;
        case "newton":
            calculator.setExpression({
                latex: '(0,0)',
                pointStyle: "POINT",
                hidden: false,
                secret: false,
                color: "red",
                parametricDomain: {min: "0", max: "1"},

                label: "Не забудь доделать",
                showLabel: true
            });
            break;
    }
}
function drawBorderDot(exp,label){
    calculator.setExpression({
        latex: exp,
        pointStyle: "POINT",
        hidden: false,
        secret: false,
        color: "red",
        parametricDomain: {min: "0", max: "1"},

        label: label,
        showLabel: true
    });
}
function drawLine(expression,label){
    calculator.setExpression({latex: expression, label:label, color: "gray",lineStyle: Desmos.Styles.DASHED});
}