let d3_test = (function() {
    let self = this;
   self.test = [
   {
    "date": "3/1/2018",
    "value": 0.24292224735475518
},
{
    "date": "3/2/2018",
    "value": 0.22550986825023753
},
{
    "date": "3/3/2018",
    "value": 0.24104355497876259
},
{
    "date": "3/4/2018",
    "value": 0.22279788695611547
},
{
    "date": "3/5/2018",
    "value": 0.21203942213152177
},
{
    "date": "3/6/2018",
    "value": 0.19574612683949247
},
{
    "date": "3/7/2018",
    "value": 0.22209366006921777
},
{
    "date": "3/8/2018",
    "value": 0.22690080442667651
},
{
    "date": "3/9/2018",
    "value": 0.23000453172177823
},
{
    "date": "3/10/2018",
    "value": 0.21326911132214393
},
{
    "date": "3/11/2018",
    "value": 0.24022118021692737
},
{
    "date": "3/12/2018",
    "value": 0.19858480197346154
},
{
    "date": "3/13/2018",
    "value": 0.21272428548716216
},
{
    "date": "3/14/2018",
    "value": 0.21673327319971852
}
];

let plot_chart = function(event,dataSet = undefined){
    if (!dataSet){
        dataSet=  self.test;
    }
    let margin ={
      top:10, left:10, right:10, bottom:10
  };
  let total = d3.max(dataSet, function(d) {return d.value});

// width and height of the card
let width = 400, height = 200;




console.log('teste');

// parse the date / time
let parseTime = d3.timeParse("%m/%d/%Y");
let step = total/4;
let range_y = d3.range(0,total + step,step);

let xScale = d3.scaleTime().range([0, width-margin.left -margin.right]).domain(d3.extent(dataSet, function(d) { return parseTime(d.date); }));

let yScale = d3.scaleLinear().range([height-margin.bottom-margin.top, 0]).domain([0,total]);

let xAxis = d3.axisBottom(xScale).tickValues(dataSet.map( function(d) {return parseTime(d.date);})).tickSizeInner(-(height-margin.bottom-margin.top)).tickFormat(d3.timeFormat("%d/%m")).tickPadding(20);

let yAxis =d3.axisLeft(yScale).tickValues(range_y).tickSize(-(width-margin.left-margin.right)).tickPadding(10);


let svg = d3.select(".one").append("svg")
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "0 0 500 350")
.append("g")
.attr("transform",
  "translate(30,20)");


let x = svg
.append("g")
.attr("class","axis")
.attr("transform", "translate(0,"+(height-margin.bottom-margin.top) +")")
.call(xAxis)
.select('.domain')
.remove();

let y = svg
.append("g")
.attr("class","axis")
.attr("transform", "translate(0,0)")
.call(yAxis)
.select('.domain')
.remove();

let line = d3.line()
.x(function(d) { return xScale(parseTime(d.date)); })
.y(function(d) { return yScale(d.value); });

svg.append("path")
.attr("class","line")
.datum(dataSet)
.attr("d",line);

};
return plot_chart;
});


window.onload = d3_test();