function range(start, stop, step) {
    var a = [start],
        b = start;
    while (b < stop) {
        b += step;
        a.push(b);
    }
    return a;
}

function xrange(start, stop, step) {
    if (typeof stop == "undefined") {
        stop = start;
        start = 0;
    }

    if (typeof step == "undefined") {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
}

lyap = Array(1000).fill(0);
j = 0;
r = range(0.0000001, 4, 0.001);

xn1 = Array(10300);
for (var i = 0; i < xn1.length; i++) {
    xn1[i] = Math.random();
}
lyp = Array(10300);
for (var i = 0; i < lyp.length; i++) {
    lyp[i] = 0;
}

lyp2 = range(0.0000001, 4, 0.001);

for (var k in xrange(10300)) {
    xn = xn1;

    for (var i = 0; i < xn1.length; i++) {
        xn1[i] = r[i] * xn[i] * (1 - xn[i]);
    }

    //Hasta aqui perfecto

    if (k > 300) {
        for (var i = 0; i < lyp2.length; i++) {
            lyp2[i] = lyp[i] + Math.log(Math.abs(r[i] - 2 * r[i] * xn1[i]));
            lyp = lyp2;
        }
    }
}

for (var i = 0; i < lyp.length; i++) {
    lyp[i] = lyp[i] / 1000;
}
separacion = 1 / lyp.length;
s = separacion;

grafica = [];
for (var pto in lyp) {
    grafica.push([s, lyp[pto]]);
    s = s + separacion;
}

functionPlot({
    width: 690,
    height: 180,
    disableZoom: false,
    target: "#canvas_lyapunov",
    tip: {
        xLine: true
    },
    xAxis: {
        label: "K1",
        domain: [0.25, 1]
    },
    yAxis: {
        label: "Lamda",
        domain: [-21, 20]
    },
    data: [
        { fn: "0", updateOnMouseMove: true },
        {
            points: grafica,
            fnType: "points",
            graphType: "polyline"
        }
    ]
});
