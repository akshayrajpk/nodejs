var width;
var height;
var svg;
var margin = { top: 30, right: 30, bottom: 30, left: 50, border: 20, stroke : 0.5, padding: 53, labelpad: 4 };
var p3 = [];
var p5 = [];
var p10 = [];
var p25 = [];
var p50 = [];
var p75 = [];
var p90 = [];
var p95 = [];
var p97 = [];
var data;
var displayDiv;
var summary;


//dataLoad();
async function dataLoad(){
//Read JSON
// kg = 2.20462262185 lb

var lb = 2.204622621;

data = await d3.json("lineData.json");  
//console.log(data);
  for(var i=0; i<=37; i +=1)
  {
    //months.push(data[i].Agemos);
    p3.push({month: data[i].Agemos, value: data[i].P3 * lb});
    p5.push({month: data[i].Agemos, value: data[i].P5 * lb});
    p10.push({month: data[i].Agemos, value: data[i].P10 * lb});
    p25.push({month: data[i].Agemos, value: data[i].P25 * lb});
    p50.push({month: data[i].Agemos, value: data[i].P50 * lb});
    p75.push({month: data[i].Agemos, value: data[i].P75 * lb});
    p90.push({month: data[i].Agemos, value: data[i].P90 * lb});
    p95.push({month: data[i].Agemos, value: data[i].P95 * lb});
    p97.push({month: data[i].Agemos, value: data[i].P97 * lb});
    
  } 
  //console.log(p3); 
  //displayLabels();
}

//generate xaxis values
var xAxisValues = [];
for (var i = 0; i <= 38; i += 0.5) {
  xAxisValues.push( { value: i, isVisible: i % 3 === 0, isSmall: i % 0.5 === 0 });
  }

//generate yaxis values
var yAxisValues = [];
//yAxisValues[0] = { value: "lb", isVisible: true };
    for (var i = 0; i <= 42; i += 0.5) {
        yAxisValues.push( { value: i, isVisible: i % 2 === 0 });
    }

//generate yaxisA values
var yAxisAValues = [];
//yAxisValues[0] = { value: "lb", isVisible: true };

for (var i = 0; i <= 18; i += 1){
  //console.log("b"+(i));
  yAxisAValues.push( { value: i, isVisible: true });
  for (var j = 0.2; j <= 0.8; j += 0.2){

    yAxisAValues.push( { value: i+j, isVisible: false });

    //console.log("a"+ (i+j));

  }
  
}
yAxisAValues.push( { value: (i-1)+j, isVisible: true });


window.onload= function(){
  dataLoad().then(()=>{
      render()
          }).then(()=>{
            displayLabels();
    })
};
// document.onload= function(){
//   dataLoad().then(()=>{
//     reun();

//   })
// };
document.onload= render();
window.addEventListener('resize', ()=>{
        render();
        displayLabels();
        
      });

function render(){
    //dataLoad();
    d3.selectAll("svg > *").remove();
      
  // width = document.body.clientWidth;
  // height =document.body.clientHeight;
  width = window.innerWidth;
  height = window.innerHeight;

//add svg elements with their values
svg = d3.select("body")
    .selectAll('svg').data([null]);
  svg.enter().append("svg")
      .merge(svg)
      .attr("height",height)
      .attr("width",width);
         
      width = width - margin.left - margin.right;
      height = height - margin.top - margin.bottom;


  svg.append("text")
        .attr("transform","translate(" + ((width+margin.left)/2) + " ," + 
                             (margin.top) + ")")
        

        .attr("text-anchor", "middle")  
        .style("font-size", ""+ ((width/margin.left)+margin.labelpad) +"") 
        .style("word-wrap","break-word")
        .style("width",width)
        .style("text-decoration", "underline")  
        .text("Growth Chart: Weight-for-age percentiles - Boys (Birth to 36 Months)");


//draw(svg);
//}







// function draw(svg){
  //console.log("im");

  
//call x axis generator
drawXaxis();

//call y axis generator
drawYaxisLeft();
drawYaxisRight();

drawYaxisLeftA();


drawLine(p3, "red",1);
drawLine(p5, "black",1);
drawLine(p10, "black",1);
drawLine(p25, "black",1);
drawLine(p50, "blue",2);
drawLine(p75, "black",1);
drawLine(p90, "black",1);
drawLine(p95, "black",1);
drawLine(p97, "green",1);

//displayLabels();

//plotInputs()
drawCircle();

}







//function to draw x axis
function drawXaxis(){

        //check whether tick is major or minor.
      var isMajorTick = function (index) {
        return xAxisValues[index].isVisible;
      }

      // //check whether tick is msmall or large.
      // var isSmallTick = function (index) {
      //   return xAxisValues[index].isSmall;
      // }

      //extract value from (xAxisValues) object for ploting
      var tickValues = xAxisValues.map( function(t) { return t.value; });

      var xscale = d3.scaleLinear()
        .domain([tickValues[0], tickValues[tickValues.length - 1]])
        .range([margin.right, width]);

        //Make tick value blank for intermediate values
        var x_axis = d3.axisBottom()

        //var x_axis = d3.svg.axis()
        .scale(xscale)
        .tickValues(tickValues)
        .tickSize(-height +margin.top)
        .tickFormat(function (d, i) {
          return isMajorTick(i) ? d : "";
        });
        
        var XAxis = svg.append("g")
        .attr("class","x axisb")
        .attr("transform", "translate("+margin.border+","+(height + margin.bottom)+")")
        .call(x_axis);   


        //Adjustments for intermediate values
        XAxis.selectAll("g")
        .filter(function (d, i) {
          return !isMajorTick(i);
        })
        .attr("stroke-width", 0.25);

        

       var title = svg.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.padding ) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "20px") 
        .text("Age (months)");

        //console.log(x_axis);
        
}//End of x axis




//function to draw yLeftA axis
function drawYaxisLeftA(){

  //check whether tick is major or minor.
var isMajorTick = function (index) {
  return yAxisAValues[index].isVisible;
}

//extract value from (yAxisValues) object for ploting
var tickValues = yAxisAValues.map( function(t) { return t.value; });

var yscale = d3.scaleLinear()
  .domain([tickValues[0], tickValues[tickValues.length - 1]])
  .range([height, margin.top]);

  var y_axis = d3.axisLeft()
  .scale(yscale)
  .tickValues(tickValues)
  .tickSize(-5)
  //.orientation(position)
  .tickFormat(function (d, i) {
    return isMajorTick(i) ? d : "";
  });

  var YAxis = svg.append("g")
  .attr("transform", "translate("+margin.border+","+margin.bottom+")")
  .call(y_axis);   

  YAxis.selectAll("g")
  .filter(function (d, i) {
    return !isMajorTick(i);
  })
  .attr("stroke-width", 0.25);

  svg.append("text")             
        .attr("transform",
              "translate(" + (margin.border) + " ," + 
                             (height + margin.padding ) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "12px") 
        .text("Kg");

  svg.append("text")             
        .attr("transform",
              "translate(" + (margin.border) + " ," + 
                             (margin.border + margin.top ) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "12px") 
        .text("Kg");


}//end of y axis left A











//function to draw y axis left
function drawYaxisLeft(){

        //check whether tick is major or minor.
      var isMajorTick = function (index) {
        return yAxisValues[index].isVisible;
      }

      //extract value from (yAxisValues) object for ploting
      var tickValues = yAxisValues.map( function(t) { return t.value; });

      var yscale = d3.scaleLinear()
        .domain([tickValues[0], tickValues[tickValues.length - 1]])
        .range([height, margin.top]);

        var y_axis = d3.axisLeft()
        .scale(yscale)
        .tickValues(tickValues)
        .tickSize(-width + margin.right)
        //.orientation(position)
        .tickFormat(function (d, i) {
          return isMajorTick(i) ? d : "";
        });

        var YAxis = svg.append("g")
        .attr("transform", "translate("+margin.left+","+margin.bottom+")")
        .call(y_axis);   

        YAxis.selectAll("g")
        .filter(function (d, i) {
          return !isMajorTick(i);
        })
        .attr("stroke-width", 0.25);

        svg.append("text")             
        .attr("transform",
              "translate(" + (margin.left) + " ," + 
                             (height + margin.padding ) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "12px") 
        .text("Lb");

        svg.append("text")             
        .attr("transform",
              "translate(" + (margin.left) + " ," + 
                             (margin.border + margin.top ) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "12px") 
        .text("Lb");

}//end of yaxis left



//function to draw y axis right
function drawYaxisRight(){

        //check whether tick is major or minor.
      var isMajorTick = function (index) {
        return yAxisValues[index].isVisible;
      }

      //extract value from (yAxisValues) object for ploting
      var tickValues = yAxisValues.map( function(t) { return t.value; });

      var yscale = d3.scaleLinear()
        .domain([tickValues[0], tickValues[tickValues.length - 1]])
        .range([height, margin.top]);

        var y_axis = d3.axisRight()
        .scale(yscale)
        .tickValues(tickValues)
        .tickSize(-9)
        //.orientation(position)
        .tickFormat(function (d, i) {
          return isMajorTick(i) ? d : "";
        });

        var YAxis = svg.append("g")
        .attr("transform", "translate("+(width + margin.right)+", "+margin.bottom+")")
        .call(y_axis);   

        YAxis.selectAll("g")
        .filter(function (d, i) {
          return !isMajorTick(i);
        })
        .attr("stroke-width", 0.25);

        svg.append("text")             
        .attr("transform",
              "translate(" + (width+margin.right) + " ," + 
                             (height + margin.padding ) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "12px") 
        .text("Lb");

        svg.append("text")             
        .attr("transform",
              "translate(" + (width+margin.right) + "," + (margin.top+margin.border) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "12px") 
        .text("Lb");

}//End of yaxis right

 

//Function to draw line
function drawLine(data, color, Line_width)
{

  //console.log(data);
  var line =d3.line()
    .x(function(d) {return (((d.month *1)*((width-margin.right)/38))+(margin.left + margin.stroke))}) // set the x values for the line generator
    .y(function(d) {return (height-margin.top) - (d.value * ((height-margin.top)/42))+(margin.top + margin.bottom + margin.stroke)}) // set the y values for the line generator 
    .curve(d3.curveMonotoneX);
  
 var d= svg.append("path")
            .datum(data)
            .attr("d",line)
            .attr("stroke", color)
            .attr("stroke-width", Line_width)
            .attr("fill", "none");  

            //console.log(d.datum);
           


            // svg.selectAll("dot")
            // .data(data)
            // .enter().append("circle")
            // .attr("r", 0.5)
            // //.attr("cx", function(d) {return (((d.month *1)*((width-margin.right)/40))+margin.right+margin.border)})
            // .attr("cx", function(d) {return (((d.month *1)*((width-margin.right)/38))+50.5)})
            // .attr("cy", function(d) {return (height-margin.top) - (d.value * ((height-margin.top)/42))+60.5});
           
}//end of draw line


function displayLabels(){
  

  var index = 37;
  var x =((width-margin.right)/38);
  var y =(((height-margin.top)/42));
  
svg.append("rect")
    .attr("height","9")     
    .attr("width","15")
    .attr("x",(((parseFloat(p3[index].month) *1)*((width-margin.right)/38))+(margin.padding)))
    .attr("y",((height-margin.top) - (parseFloat(p3[index].value) * ((height-margin.top)/42))+(margin.padding + margin.labelpad)))
    .attr("fill","white");


 svg.append("text")             
 .attr("transform",
       "translate(" + (((parseFloat(p3[index].month) *1)*((width-margin.right)/38))+(margin.left + margin.labelpad)) + "," + ((height-margin.top) - (parseFloat(p3[index].value) * ((height-margin.top)/42))+(margin.top + margin.bottom + margin.labelpad)) + ")")
 .style("text-anchor", "right")
 .style("fill","red")
 .style("font-size", "9px") 
 .text("3rd");


 svg.append("rect")
 .attr("height","8")     
 .attr("width","15")
 .attr("x",(((parseFloat(p5[index].month) *1)*((width-margin.right)/38))+(margin.padding)))
 .attr("y",((height-margin.top) - (parseFloat(p5[index].value) * ((height-margin.top)/42))+(margin.padding + margin.labelpad)))
 .attr("fill","white");


svg.append("text")             
.attr("transform",
    "translate(" + (((parseFloat(p5[index].month) *1)*((width-margin.right)/38))+(margin.left + margin.labelpad)) + "," + ((height-margin.top) - (parseFloat(p5[index].value) * ((height-margin.top)/42))+(margin.top + margin.bottom + margin.labelpad)) + ")")
.style("text-anchor", "right")
.style("fill","black")
.style("font-size", "9px") 
.text("5th");

svg.append("rect")
 .attr("height","9")     
 .attr("width","18")
 .attr("x",(((parseFloat(p10[index].month) *1)*((width-margin.right)/38))+(margin.padding)))
 .attr("y",((height-margin.top) - (parseFloat(p10[index].value) * ((height-margin.top)/42))+(margin.padding + margin.labelpad)))
 .attr("fill","white");


svg.append("text")             
.attr("transform",
    "translate(" + (((parseFloat(p10[index].month) *1)*((width-margin.right)/38))+(margin.left + margin.labelpad)) + "," + ((height-margin.top) - (parseFloat(p10[index].value) * ((height-margin.top)/42))+(margin.top + margin.bottom + margin.labelpad)) + ")")
.style("text-anchor", "right")
.style("fill","black")
.style("font-size", "9px") 
.text("10th");

svg.append("rect")
 .attr("height","9")     
 .attr("width","18")
 .attr("x",(((parseFloat(p25[index].month) *1)*((width-margin.right)/38))+(margin.padding)))
 .attr("y",((height-margin.top) - (parseFloat(p25[index].value) * ((height-margin.top)/42))+(margin.padding + margin.labelpad)))
 .attr("fill","white");


svg.append("text")             
.attr("transform",
    "translate(" + (((parseFloat(p25[index].month) *1)*((width-margin.right)/38))+(margin.left + margin.labelpad)) + "," + ((height-margin.top) - (parseFloat(p25[index].value) * ((height-margin.top)/42))+(margin.top + margin.bottom + margin.labelpad)) + ")")
.style("text-anchor", "right")
.style("fill","black")
.style("font-size", "9px") 
.text("25th");

svg.append("rect")
 .attr("height","9")     
 .attr("width","18")
 .attr("x",(((parseFloat(p50[index].month) *1)*((width-margin.right)/38))+(margin.padding)))
 .attr("y",((height-margin.top) - (parseFloat(p50[index].value) * ((height-margin.top)/42))+(margin.padding + margin.labelpad)))
 .attr("fill","white");


svg.append("text")             
.attr("transform",
    "translate(" + (((parseFloat(p50[index].month) *1)*((width-margin.right)/38))+(margin.left + margin.labelpad)) + "," + ((height-margin.top) - (parseFloat(p50[index].value) * ((height-margin.top)/42))+(margin.top + margin.bottom + margin.labelpad)) + ")")
.style("text-anchor", "right")
.style("fill","blue")
.style("font-size", "9px") 
.text("50th");

svg.append("rect")
 .attr("height","9")     
 .attr("width","18")
 .attr("x",(((parseFloat(p75[index].month) *1)*((width-margin.right)/38))+(margin.padding)))
 .attr("y",((height-margin.top) - (parseFloat(p75[index].value) * ((height-margin.top)/42))+(margin.padding + margin.labelpad)))
 .attr("fill","white");


svg.append("text")             
.attr("transform",
    "translate(" + (((parseFloat(p75[index].month) *1)*((width-margin.right)/38))+(margin.left + margin.labelpad)) + "," + ((height-margin.top) - (parseFloat(p75[index].value) * ((height-margin.top)/42))+(margin.top + margin.bottom + margin.labelpad)) + ")")
.style("text-anchor", "right")
.style("fill","black")
.style("font-size", "9px") 
.text("75th");

svg.append("rect")
 .attr("height","9")     
 .attr("width","18")
 .attr("x",(((parseFloat(p90[index].month) *1)*((width-margin.right)/38))+(margin.padding)))
 .attr("y",((height-margin.top) - (parseFloat(p90[index].value) * ((height-margin.top)/42))+(margin.padding + margin.labelpad)))
 .attr("fill","white");


svg.append("text")             
.attr("transform",
    "translate(" + (((parseFloat(p90[index].month) *1)*((width-margin.right)/38))+(margin.left + margin.labelpad)) + "," + ((height-margin.top) - (parseFloat(p90[index].value) * ((height-margin.top)/42))+(margin.top + margin.bottom + margin.labelpad)) + ")")
.style("text-anchor", "right")
.style("fill","black")
.style("font-size", "9px") 
.text("90th");

svg.append("rect")
 .attr("height","9")     
 .attr("width","18")
 .attr("x",(((parseFloat(p95[index].month) *1)*((width-margin.right)/38))+(margin.padding)))
 .attr("y",((height-margin.top) - (parseFloat(p95[index].value) * ((height-margin.top)/42))+(margin.padding + margin.labelpad)))
 .attr("fill","white");


svg.append("text")             
.attr("transform",
    "translate(" + (((parseFloat(p95[index].month) *1)*((width-margin.right)/38))+(margin.left + margin.labelpad)) + "," + ((height-margin.top) - (parseFloat(p95[index].value) * ((height-margin.top)/42))+(margin.top + margin.bottom + margin.labelpad)) + ")")
.style("text-anchor", "right")
.style("fill","black")
.style("font-size", "9px") 
.text("95th");

svg.append("rect")
 .attr("height","9")     
 .attr("width","18")
 .attr("x",(((parseFloat(p97[index].month) *1)*((width-margin.right)/38))+(margin.padding)))
 .attr("y",((height-margin.top) - (parseFloat(p97[index].value) * ((height-margin.top)/42))+(margin.padding + margin.labelpad)))
 .attr("fill","white");


svg.append("text")             
.attr("transform",
    "translate(" + (((parseFloat(p97[index].month) *1)*((width-margin.right)/38))+(margin.left + margin.labelpad)) + "," + ((height-margin.top) - (parseFloat(p97[index].value) * ((height-margin.top)/42))+(margin.top + margin.bottom + margin.labelpad)) + ")")
.style("text-anchor", "right")
.style("fill","green")
.style("font-size", "9px") 
.text("97th");



}


async function plotInputs(plotPoint){   
        
  dat = await d3.json("lineData.json");

  //console.log(plotData.length());

  //herea:
  for(var i=0; i<=37; i+=1){
      
    if(parseFloat(dat[i].Agemos) == parseFloat(plotPoint.month)) {
      growthCheck(i);
      //console.log("i"+dat[i].Agemos);
     //break herea;
    }
    else if(parseFloat(plotPoint.month) > parseFloat(dat[i].Agemos) && parseFloat(plotPoint.month) < parseFloat(dat[i+1].Agemos)){
      //console.log("between");
      growthCheckMidValues(i);
    }   
  }//end of for

  
  function growthCheck(index){
    
    if(parseFloat(plotPoint.weight) <= parseFloat(dat[index].P3)){
      //console.log("Plota"+plotData.weight);
      summary = "Growth rate 3% or below";
      //console.log(summary);
      //return;
    }
    else if(parseFloat(plotPoint.weight) > parseFloat(dat[index].P3)  && parseFloat(plotPoint.weight) <= parseFloat(dat[index].P50)){
      //console.log("Plotb"+plotData.weight);
            summary = "Growth rate between 3% & 50%";
           // console.log(summary);
            //return;
    }
    else if(parseFloat(plotPoint.weight) > parseFloat(dat[index].P50)  && parseFloat(plotPoint.weight) <= parseFloat(dat[index].P97)){
      //console.log("Plotb"+plotData.weight);
            summary = "Growth rate between 50% & 97%";
            //console.log(summary);
            //return;
    }
    else if(parseFloat(plotPoint.weight) > parseFloat(dat[index].P97)){
      //console.log("Plotb"+plotData.weight);
      summary = "Growth rate above 97%";
      //console.log(summary);
    }
    
  
  }//end of growthcheck

  function growthCheckMidValues(index){
    function average(first, second){
      let sum = parseFloat(first)+parseFloat(second);
      return sum/2;
    }
    
    if(parseFloat(plotPoint.weight) <= average(dat[index].P3,dat[index+1].P3)){
      //console.log("Plota"+plotData.weight);
      summary = "Growth rate 3% or below";
      //console.log(summary);
      //return;
    }
    else if(parseFloat(plotPoint.weight) > average(dat[index].P3, dat[index+1].P3)  && parseFloat(plotPoint.weight) <= average(dat[index].P50 , dat[index+1].P50)){
      //console.log("Plotb"+plotData.weight);
            summary = "Growth rate between 3% & 50%";
           // console.log(summary);
            //return;
    }
    else if(parseFloat(plotPoint.weight) > average(dat[index].P50,dat[index+1].P50)  && parseFloat(plotPoint.weight) <= average(dat[index].P97,dat[index+1].P97)){
      //console.log("Plotb"+plotData.weight);
            summary = "Growth rate between 50% & 97%";
            //console.log(summary);
            //return;
    }
    else if(parseFloat(plotPoint.weight) > average(dat[index].P97,dat[index+1].P97)){
      //console.log("Plotb"+plotData.weight);
      summary = "Growth rate above 97%";
      //console.log(summary);
    }
    
  
  }//end of growthcheck


//}
}//end of plotInputs

//var displayDiv = d3.select("body").append("div").attr("class", "toolTip")
mouseMoveHandler = async function(d)
{
// console.log("insinde mouseover")
var plotPoint = {month:d.months, weight:d.weight};
  //console.log(plotPoint);
  // console.log(d);
  // await 
  plotInputs(plotPoint);
  //.then(()=>{
  

  // displayDiv = d3.select("body").append("div").attr("class", "toolTip");
  //console.log("im pointed");
  // displayDiv.style("left", d3.event.pageX+margin.labelpad+"px");
  // displayDiv.style("top", d3.event.pageY-margin.border+"px");
  displayDiv.style("left", event.clientX+margin.labelpad+"px");
  displayDiv.style("top", event.clientY-margin.border+"px");
  displayDiv.style("display", "inline-block");
  
  displayDiv.html(("Month(s): "+plotPoint.month)+"<br>"+("Weight: "+plotPoint.weight)+"Kg" + "<br>"+(summary));
//})
} 



function drawCircle(){
  displayDiv = d3.select("body").append("div").attr("class", "toolTip");
  var lb = 2.204622621;    
  var inputData;
  fetch("/data").then(async(response)=>{
      inputData = await response.json();
      //console.log(inputData);
      }) .then(()=>{ 
  svg.selectAll("dot")
    .data(inputData)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", function(d) {return ((d.months *1)*((width-margin.right)/38))+(margin.left + margin.stroke)})
    .attr("cy", function(d) {return ((height-margin.top) - ((d.weight *lb) * ((height-margin.top)/42))+(margin.top + margin.bottom + margin.stroke));})
    .on("mousemove", mouseMoveHandler)
    .on("mouseout", function(d){
        displayDiv.style("display", "none");
      });
    })
}




