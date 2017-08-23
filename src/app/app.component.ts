import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare let d3: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  options;
  data;
  ngOnInit() {
    // Uncomment if you want to the 'discreteBarChart'
    // this.options = {
    //   chart: {
    //     type: 'discreteBarChart',
    //     height: 450,
    //     margin : {
    //       top: 20,
    //       right: 20,
    //       bottom: 50,
    //       left: 55
    //     },
    //     x: function(d){return d.label;},
    //     y: function(d){return d.value;},
    //     showValues: true,
    //     valueFormat: function(d){
    //       return d3.format(',.4f')(d);
    //     },
    //     duration: 500,
    //     xAxis: {
    //       axisLabel: 'X Axis'
    //     },
    //     yAxis: {
    //       axisLabel: 'Y Axis',
    //       axisLabelDistance: -10
    //     }
    //   }
    // }
    // this.data = [
    //   {
    //     key: "Cumulative Return",
    //     values: [
    //       {
    //         "label" : "A" ,
    //         "value" : -29.765957771107
    //       } ,
    //       {
    //         "label" : "B" ,
    //         "value" : 0
    //       } ,
    //       {
    //         "label" : "C" ,
    //         "value" : 32.807804682612
    //       } ,
    //       {
    //         "label" : "D" ,
    //         "value" : 196.45946739256
    //       } ,
    //       {
    //         "label" : "E" ,
    //         "value" : 0.19434030906893
    //       } ,
    //       {
    //         "label" : "F" ,
    //         "value" : -98.079782601442
    //       } ,
    //       {
    //         "label" : "G" ,
    //         "value" : -13.925743130903
    //       } ,
    //       {
    //         "label" : "H" ,
    //         "value" : -5.1387322875705
    //       }
    //     ]
    //   }
    // ];
    this.options = {
      chart: {
        type: 'multiBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 45,
          left: 45
        },
        clipEdge: true,
        // staggerLabels: true,
        duration: 500,
        stacked: true,
        xAxis: {
          axisLabel: 'Time (ms)',
          showMaxMin: false,
          tickFormat: function(d){
            return d3.format(',f')(d);
          }
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -20,
          tickFormat: function(d){
            return d3.format(',.1f')(d);
          }
        }
      }
    };
    this.data = generateDataMultiBar();
// MultiBarChart
    /* Random Data Generator (took from nvd3.org) */
    function generateDataMultiBar() {
      return stream_layers(3, 50 + Math.random() * 50, 0.1).map(function(data, i) {
        console.log(data);
        return {
          key: 'Stream' + i,
          values: data
        };
      });
    }

    /* Inspired by Lee Byron's test data generator. */
    function stream_layers(n, m, o) {
      if (arguments.length < 3) {
        o = 0;
      }
      function bump(a) {
        const x = 1 / (.1 + Math.random()),
          y = 2 * Math.random() - .5,
          z = 10 / (.1 + Math.random());
        for (let i = 0; i < m; i++) {
          const w = (i / m - y) * z;
          a[i] += x * Math.exp(-w * w);
        }
      }
      return d3.range(n).map(function() {
        const a = [];
        let i;
        for (i = 0; i < m; i++) {
          a[i] = o + o * Math.random();
        }
        for (i = 0; i < 5; i++) {
          bump(a);
        }
        return a.map(stream_index);
      });
    }

    function stream_index(d, i) {
      return {x: i, y: Math.max(0, d)};
    }
  }

}
