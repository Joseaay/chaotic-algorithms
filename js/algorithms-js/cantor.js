var width = 1200,
    height = 180;

var svg = d3
    .select("#content")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(
        d3.behavior
            .zoom()
            .scaleExtent([1, 50000])
            .on("zoom", zoom)
    )
    .append("g");

var margin = { left: 0, right: 0, top: 10, bottom: 0 };
var xScale = d3.scale
    .linear()
    .domain([0, 1020])
    .range([margin.left, width]);
var yScale = d3.scale
    .linear()
    .domain([0, 200])
    .range([height, margin.top]);
var lineGenerator = d3.svg
    .line()
    .x(function(d) {
        return d.x;
    })
    .y(function(d) {
        return d.y;
    })
    .interpolate("linear");

var coords = [];

function cantorSet(level, left, right, height) {
    var coordinates = [
        { x: xScale(left), y: 10 * height },
        { x: xScale(right), y: 10 * height }
    ];

    coords[coords.length] = coordinates;

    var line = svg.append("path").attr({
        d: lineGenerator(coordinates),
        stroke: "black",
        "stroke-width": 5,
        fill: "none"
    });

    var length = (1 / 3) * Math.abs(left - right);

    if (level != 0) {
        cantorSet(level - 1, left, left + length, height + 1);
        cantorSet(level - 1, right - length, right, height + 1);
    }
}

function zoom() {
    svg.attr(
        "transform",
        "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"
    );
}
