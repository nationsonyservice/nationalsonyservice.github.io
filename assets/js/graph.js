$(document).ready(function(){

var randomScalingFactor = function() {
    return Math.ceil(Math.random() * 10.0) * Math.pow(10, Math.ceil(Math.random() * 5));
};

var dataMonthsLine = JSON.parse(document.getElementById('canvas-line').getAttribute('data-months-line'));
var line_graph_data;
if(line_lable_values!=0){
    line_graph_data = line_lable_values;
  }else{
    line_graph_data =[{
            label: "Banglore",
            fill: false,
            responsive:true,
            maintainAspectRatio:true,
            backgroundColor: window.chartColors.darkbrown,
            borderColor: window.chartColors.darkbrown,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
        }, 
        {
            label: "Mumbai",
            fill: false,
            responsive:true,
            maintainAspectRatio:true,
            backgroundColor: window.chartColors.lightbrown,
            borderColor: window.chartColors.lightbrown,                  
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
        }, 
        {
            label: "Pune",
            responsive:true,
            maintainAspectRatio:true,
            backgroundColor: window.chartColors.grey,
            borderColor: window.chartColors.grey,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            fill: false,
        }, 
        {
            label: "Kolkata",
            fill: false,
            responsive:true,
            maintainAspectRatio:true,
            backgroundColor: window.chartColors.white,
            borderColor: window.chartColors.white,                  
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
        },
        {
            label: "Jaipur",
            fill: false,
            responsive:true,
            maintainAspectRatio:true,
            backgroundColor: window.chartColors.navy,
            borderColor: window.chartColors.navy,                  
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
        }];
  }
var configLine = {
    type: 'line',
    data: {
        labels: dataMonthsLine,
        datasets: line_graph_data,
    },

    options: {
        responsive: true,
        duration: 2000,
        title:{
            display:false
        },
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontSize: 14,
                fontStyle: "normal",
                fontColor: "#000000",
                fontFamily: "CraftGothic-Regular",
                padding: 30
            },
        },
        
        tooltips: {
            display: false
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                padding: 30,
                scaleLabel: {
                    display: false,
                },
                gridLines: {
                    display: false
                },
                ticks: {
                    //stepSize: 20,
                    fontSize: 14,
                    fontFamily: "CraftGothic-Regular",
                    fontColor: "#000000"
                }
            }],
            yAxes: [{
                display: true,
                padding: 30,
                scaleLabel: {
                    display: false,
                    labelString: 'Value'
                },
                ticks: {
                    fontSize: 14,
                    fontFamily: "CraftGothic-Regular",
                    fontColor: "#000000"
                }
            }]
        }
    }
};


/*--Pie Chart starts here--*/

var randomPieFactor = function() {
    return Math.round(Math.random() * 100);
};

var dataLabelsPie = JSON.parse(document.getElementById('canvas-pie').getAttribute('data-labels-pie'));
var graph_data;
 if(pie_label_values==0){
    graph_data=[randomPieFactor(),randomPieFactor(),randomPieFactor(),randomPieFactor(),randomPieFactor(),randomPieFactor(),];
 }else{
    graph_data=pie_label_values;
 }
Chart.defaults.pie = Chart.helpers.clone(Chart.defaults.pie);

var helpers = Chart.helpers;
var defaults = Chart.defaults;

Chart.controllers.pie = Chart.controllers.pie.extend({
    updateElement: function(arc, index, reset) {
    var _this = this;
    var chart = _this.chart,
        chartArea = chart.chartArea,
        opts = chart.options,
        animationOpts = opts.animation,
        arcOpts = opts.elements.arc,
        centerX = (chartArea.left + chartArea.right) / 2,
        centerY = (chartArea.top + chartArea.bottom) / 2,
        startAngle = opts.rotation, // non reset case handled later
        endAngle = opts.rotation, // non reset case handled later
        dataset = _this.getDataset(),
        circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : _this.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI)),
        innerRadius = reset && animationOpts.animateScale ? 0 : _this.innerRadius,
        outerRadius = reset && animationOpts.animateScale ? 0 : _this.outerRadius,
        custom = arc.custom || {},
        valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;

    helpers.extend(arc, {
      // Utility
      _datasetIndex: _this.index,
      _index: index,

      // Desired view properties
      _model: {
        x: centerX + chart.offsetX,
        y: centerY + chart.offsetY,
        startAngle: startAngle,
        endAngle: endAngle,
        circumference: circumference,
        outerRadius: outerRadius,
        innerRadius: innerRadius,
        label: dataLabelsPie
      },

      draw: function () {
        var ctx = this._chart.ctx,
                        vm = this._view,
                        sA = vm.startAngle,
                        eA = vm.endAngle,
                        opts = this._chart.config.options;
                
                    var labelPos = this.tooltipPosition();
                    var segmentLabel = vm.circumference / opts.circumference * 100;
                    
                    ctx.beginPath();
                    
                    ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
                    ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);
                    
                    ctx.closePath();
                    ctx.strokeStyle = vm.borderColor;
                    ctx.lineWidth = vm.borderWidth;
                    
                    ctx.fillStyle = vm.backgroundColor;
                    
                    ctx.fill();
                    ctx.lineJoin = 'bevel';
                    
                    if (vm.borderWidth) {
                        ctx.stroke();
                    }
                    
                    if (vm.circumference > 0.25) { // Trying to hide label when it doesn't fit in segment
                        ctx.beginPath();
                        ctx.font = helpers.fontString(opts.defaultFontSize, opts.defaultFontStyle, opts.defaultFontFamily);
                        ctx.fillStyle = "#fff";
                        ctx.textBaseline = "top";
                        ctx.textAlign = "center";
            
                        // Round percentage in a way that it always adds up to 100%
                        ctx.fillText(graph_data[index] + "%", labelPos.x, labelPos.y);
                    }
      }
    });

    var model = arc._model;
    model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor);
    model.hoverBackgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueAtIndexOrDefault(dataset.hoverBackgroundColor, index, arcOpts.hoverBackgroundColor);
    model.borderWidth = custom.borderWidth ? custom.borderWidth : valueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth);
    model.borderColor = custom.borderColor ? custom.borderColor : valueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor);

    // Set correct angles if not resetting
    if (!reset || !animationOpts.animateRotate) {
      if (index === 0) {
        model.startAngle = opts.rotation;
      } else {
        model.startAngle = _this.getMeta().data[index - 1]._model.endAngle;
      }

      model.endAngle = model.startAngle + model.circumference;
    }

    arc.pivot();
  }
});

var configPie = {
    type: 'pie',
    data: {
        datasets: [{
            data: graph_data,        

            backgroundColor: [
                window.chartColors.darkbrown,
                window.chartColors.lightbrown,
                window.chartColors.grey,
                window.chartColors.white,
                window.chartColors.navy,
            ],
        }],
        labels: dataLabelsPie
    },

    options: {
        responsive: true,
        tooltips: {
            callbacks: {
                label: function(tooltipItems, data) {
                    return data.labels[tooltipItems.index] + 
                    " : " + 
                    data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] +
                    ' %';
                }
            }
        },
        showAllTooltips: true,
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontSize: 14,
                fontStyle: "normal",
                fontColor: "#000000",
                fontFamily: "CraftGothic-Regular",
                padding: 30,
            },
        },
    }
};


var options = {
    animation: true,
    animationEasing: 'easeInOutQuart',
    animationSteps: 80,
    duration: 50000,
    segmentShowStroke: false
};

/*--Pie Chart ends here--*/

/*--Bar Graph stats here--*/

var densityCanvas = document.getElementById("bargraph");
var dataLabelsBar = JSON.parse(document.getElementById('bargraph').getAttribute('data-labels-bar'));

// var densityData = {
//   label: 'Density of Planets (kg/m3)',
//   data: dataLabelsBar,
//   backgroundColor: [
//     window.chartColors.darkbrown,
//     window.chartColors.lightbrown,
//     window.chartColors.grey,
//     window.chartColors.white,
//     window.chartColors.navy,
//   ]
// };

var chartOptions = {
  scales: {
    xAxes: [{
        beginAtZero: true,
        display: true,
        padding: 30,
        scaleLabel: {
            display: false,
        },
        ticks: {
            fontSize: 14,
            fontFamily: "CraftGothic-Regular",
            fontColor: "#000000",
             beginAtZero: true,
        },
    }],
    yAxes: [{
      barPercentage: 0.5,
      display: true,
      gridLines: {
            display: false
        },
      ticks: {
            fontSize: 14,
            fontFamily: "CraftGothic-Regular",
            fontColor: "#000000"
        }
    }]
  },
  elements: {
    rectangle: {
      borderSkipped: 'left',
    }
  },
  responsive: true,
    //showAllTooltips: false,
    tooltips: {
         enabled: false
        },
    legend: {
        display: false,
        position: 'bottom',
        labels: {
            fontSize: 14,
            fontStyle: "normal",
            fontColor: "#000000",
            fontFamily: "CraftGothic-Regular",
            padding: 30,
        },
    },
};

/*var barChart = new Chart(densityCanvas, {
  type: 'horizontalBar',
  data: {
        labels: ["Point of Sale", "Made In India", "Please See", "Indians in America", "Purple", "Orange"],
        datasets: [{
            label: '',
            data: [2555, 3333, 4122, 5000, 1000, 500],
            backgroundColor: [
                window.chartColors.darkbrown,
                window.chartColors.lightbrown,
                window.chartColors.grey,
                window.chartColors.white,
                window.chartColors.navy,
              ],
        }]
    },
  options: chartOptions
});*/

/*--Bar Graph ends here--*/



/*--Animation Function stats here--*/
var inView = false;

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}

$(window).scroll(function() {

    if (isScrolledIntoView("#canvas-line")) {
        if (inView) { return; }
        inView = true;
        var line = document.getElementById("canvas-line").getContext("2d");
        window.myLine = new Chart(line, configLine);
    } else {
        inView = false;  
    }
});

var inView2 = false;

function isScrolledIntoView2(elem)
{
    var docViewTop2 = $(window).scrollTop();
    var docViewBottom2 = docViewTop2 + $(window).height();

    var elemTop2 = $(elem).offset().top;
    var elemBottom2 = elemTop2 + $(elem).height();

    return ((elemTop2 <= docViewBottom2) && (elemBottom2 >= docViewTop2));
}

$(window).scroll(function() {
    if (isScrolledIntoView2("#canvas-pie")) {
        if (inView2) { return; }
        inView2 = true;
        var pie = document.getElementById("canvas-pie").getContext("2d");
        window.myPie = new Chart(pie, configPie, options);
    } else {
        inView2 = false;  
    }
});

var inView3 = false;

function isScrolledIntoView3(elem)
{
    var docViewTop3 = $(window).scrollTop();
    var docViewBottom3 = docViewTop3 + $(window).height();

    var elemTop3 = $(elem).offset().top;
    var elemBottom3 = elemTop3 + $(elem).height();

    return ((elemTop3 <= docViewBottom3) && (elemBottom3 >= docViewTop3));
}

$(window).scroll(function() {
    if (isScrolledIntoView3("#bargraph")) {
        if (inView3) { return; }
        inView3 = true;
        /*var pie = document.getElementById("bargraph").getContext("3d");
        window.myPie = new Chart(pie, configPie, options);*/
        if(bar_label_values!=0){
            var barlabels=bar_label_text;
            var bardata=bar_label_values;
        }else{
            var barlabels=["Point of Sale", "Made In India", "Please See", "Indians in America", "Purple", "Orange"];
            var bardata=[2555, 3333, 4122, 5000, 1000, 500];
        }
        var barChart = new Chart(densityCanvas, {
          type: 'horizontalBar',
          data: {
                labels: barlabels,
                datasets: [{
                    label: '',
                    data: bardata,
                    backgroundColor: [
                        window.chartColors.darkbrown,
                        window.chartColors.lightbrown,
                        window.chartColors.grey,
                        window.chartColors.white,
                        window.chartColors.navy,
                      ],
                }],
            },
          options: chartOptions
        });

    } else {
        inView3 = false;  
    }
});
/*--Animation Function ends here--*/


});


