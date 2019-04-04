function point(pos, color) {
    var c =
        255 - Math.round((1 + Math.log(color) / Math.log(o.maxIterate)) * 255);
    c = c.toString(16);

    if (c.length == 1) c = "0" + c;
    o.canvas.fillStyle = "#0000" + c;
    o.canvas.fillRect(pos[0], pos[1], 1, 1);
}

function conversion(x, y, R) {
    var m = R / o.width;
    var x1 = m * (2 * x - o.width);
    var y2 = m * (o.width - 2 * y);
    return [x1, y2];
}

function f(z, c) {
    return [z[0] * z[0] - z[1] * z[1] + c[0], 2 * z[0] * z[1] + c[1]];
}

function abs(z) {
    return Math.sqrt(z[0] * z[0] + z[1] * z[1]);
}

function actualizar() {
    o = {
        length: 640,
        width: 480,
        c: [
            parseFloat(document.getElementsByName("c1")[0].value),
            parseFloat(document.getElementsByName("c2")[0].value)
        ], // c = x + iy will be [x, y]
        maxIterate: parseInt(document.getElementsByName("iterations")[0].value),
        canvas: null
    };

    var R = (1 + Math.sqrt(1 + 4 * abs(o.c))) / 2,
        z,
        x,
        y,
        i;

    document
        .getElementById("a")
        .getContext("2d")
        .clearRect(
            0,
            0,
            document.getElementById("a").width,
            document.getElementById("a").height
        );
    o.canvas = document.getElementById("a").getContext("2d");
    for (x = 0; x < o.width; x++) {
        for (y = 0; y < o.length; y++) {
            i = 0;
            z = conversion(x, y, R);
            while (i < o.maxIterate && abs(z) < R) {
                z = f(z, o.c);
                if (abs(z) > R) break;
                i++;
            }

            if (i) point([x, y], i / o.maxIterate);
        }
    }
}

actualizar();

function reset() {
    document.getElementsByName("c1")[0].value = "0.285";
    document.getElementsByName("c2")[0].value = "-0.01";
    document.getElementsByName("iterations")[0].value = "200";
    actualizar();
}
