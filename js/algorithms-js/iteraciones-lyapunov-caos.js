start();
function start() {
    (pto = parseFloat(document.getElementsByName("punto_inicial")[0].value)),
        (funcion = document.getElementsByName("funcion")[0].value),
        (grafica = [[pto, 0]]);

    for (
        var i = 0;
        i < document.getElementsByName("repeticiones")[0].value;
        i++
    ) {
        evaluacion = parseFloat(math.eval(funcion.replace(/x/g, pto)));

        if (evaluacion > 9999999999 || evaluacion < -99999999) {
            break;
        }

        grafica.push([pto, evaluacion]);
        grafica.push([evaluacion, evaluacion]);
        pto = evaluacion;
    }

    functionPlot({
        width: 690,
        height: 380,
        target: "#canvas_iteraciones",
        xAxis: {
            label: "Eje de X",
            domain: [0, 1]
        },
        yAxis: {
            label: "Eje de Y",
            domain: [0, 1]
        },
        data: [
            { fn: "x", color: "blue" },
            { fn: funcion },
            {
                points: grafica,
                fnType: "points",
                graphType: "polyline",
                color: "green"
            }
        ]
    });
}
