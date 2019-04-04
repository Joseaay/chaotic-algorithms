var r = 0;
var g = 0;
var b = 0;


function mandelbrot() {
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");

    // Ancho y alto de la imagen
    var imagew = canvas.width;
    var imageh = canvas.height;

    // RGBA Datos de la imagen
    var imagedata = context.createImageData(imagew, imageh);

    // Parametros para el zoom
    var osx = -imagew/2;
    var osy = -imageh/2;
    var panx = -110;
    var pany = 0;
    var zoom = 205;
    var paleta = [];

    // Máximo númerod e iteraciones por pixel
    var iteracionesmaximas = parseInt(document.getElementsByName("iterations")[0].value);

    function init() {
        canvas.addEventListener("dblclick", onMouseDown);
        canvas.addEventListener("mousedown", unClick);

        // Genera paleta
        generatepaleta();

        // Genera imagen
        generateImage();

        main(0);
    }

    function main(tframe) {
        window.requestAnimationFrame(main);

        // Dibuja imagen generada
        context.putImageData(imagedata, 0, 0);
    }

    // Genera paleta
    function generatepaleta() {
        // Calcula el gradiente
        var roffset = r;
        var goffset = g;
        var boffset = b;

        for (var i=0; i<256; i++) {
            paleta[i] = { r:roffset, g:goffset, b:boffset};

            if (i < 64) {
                roffset += 3;
            } else if (i<128) {
                goffset += 3;
            } else if (i<192) {
                boffset += 3;
            }
        }
    }

    // Genera la imagen del fractal
    function generateImage() {
        for (var y=0; y<imageh; y++) {
            for (var x=0; x<imagew; x++) {
                iterate(x, y, iteracionesmaximas);
            }
        }
    }

    // Calcula el color especifico de cada pixel
    function iterate(x, y, iteracionesmaximas) {
        var x0 = (x + osx + panx) / zoom;
        var y0 = (y + osy + pany) / zoom;

        var a = 0;
        var b = 0;
        var rx = 0;
        var ry = 0;

        var iterations = 0;
        while (iterations < iteracionesmaximas && (rx * rx + ry * ry <= 4)) {
            rx = a * a - b * b + x0;
            ry = 2 * a * b + y0;

            a = rx;
            b = ry;
            iterations++;
        }

        // Obtener la paleta de color conforme al numero de iteraciones
        var color;
        if (iterations == iteracionesmaximas) {
            color = { r:0, g:0, b:0};
        } else {
            var index = Math.floor((iterations / (iteracionesmaximas-1)) * 255);
            color = paleta[index];
        }

        // Aplica color
        var pixelindex = (y * imagew + x) * 4;
        imagedata.data[pixelindex] = color.r;
        imagedata.data[pixelindex+1] = color.g;
        imagedata.data[pixelindex+2] = color.b;
        imagedata.data[pixelindex+3] = 255;
    }

    // Zoom
    function fzoom(x, y, f, zoomin) {
        if (!zoomin) {
          zoom /= f;
          panx = (x + osx + panx) / f;
          pany = (y + osy + pany) / f;
        } else {
            zoom *= f;
            panx = f * (x + osx + panx);
            pany = f * (y + osy + pany);
        }
    }

    function onMouseDown(e) {
        var pos = getMousePos(canvas, e);

        var zoomin = true;
        if (e.ctrlKey) {
            zoomin = false;
        }

        var zoomf = 2;
        if (e.shiftKey) {
            zoomf = 1;
        }

        fzoom(pos.x, pos.y, zoomf, zoomin);

        generateImage();
    }

    function unClick(e){
      var pos = getMousePos(canvas, e);

      var x0 = (pos.x + osx + panx) / zoom;
      var y0 = (pos.y + osy + pany) / zoom;

      document.getElementsByName("c1")[0].value = x0;
      document.getElementsByName("c2")[0].value = y0;
      actualizar();
    }

    // Consigue la posición del ratón
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
            y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
        };
    }

    init();
};

function reset(){
  document.getElementsByName("blue")[0].value = 2;
  document.getElementsByName("red")[0].value = 0;
  document.getElementsByName("green")[0].value = 0;
  document.getElementsByName("iterations")[0].value = 200;

  changeColor();
  mandelbrot();
}
