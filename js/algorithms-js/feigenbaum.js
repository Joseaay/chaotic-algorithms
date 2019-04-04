(function() {
    var c = document.getElementById("c"),
        ctx = c.getContext("2d"),
        w = c.width,
        h = c.height,
        st = 2 / w,
        fx = function(x1, r) {
            return r * x1 * (1 - x1);
        },
        it = function(r) {
            var idx = 0,
                x = 0.5,
                xc = w * ((r - 2) / 2);
            while (idx++ < 2000) {
                x = fx(x, r);
                ctx.fillRect(xc, h - x * h, 1, 1);
            }
        };
    ctx.fillStyle = "rgba(30,0,0,0.05)";
    for (r = 2; r < 4; r += st) {
        (function(r1) {
            setTimeout(function() {
                it(r1);
            }, 0);
        })(r);
    }
})();
