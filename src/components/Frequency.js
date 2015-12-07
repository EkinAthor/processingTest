import React, { Component, PropTypes } from 'react';
import d3 from 'd3';

export default class Frequency extends Component {
	render() {
		return (
				<div>
					<div className='freqChart' ref='chart'></div>
					<div className='freqTablex' >
						<table ref='table' className='freqTable frequencyTable'></table>
					</div>
				</div>
			);
	}
	componentDidMount() {
		var el = this.refs.chart;
		var table = this.refs.table;
		this.chart = new FreqChart;
		this.chart.create(el, table, this.props.d);
		this.chart.updateData(el,table, this.props.d);
	}
	componentDidUpdate() {
		var el = this.refs.chart;
		var table = this.refs.table;
		//var chart = new FreqChart;
		this.chart.updateData(el,table,this.props.d);
	}
}

class FreqChart {
	create(el,table, data) {
		var width = 400;
    	var height = 200;
   		var numOfRows = 10;
    	var delay = 500;
   		this.svg = d3.select(el).append("svg")
            .attr("width", width)
            .attr("height",height)
            .append("g");
    
    //this.updateData();
	}
	updateData(el,table, data) {
		this.svg = d3.select(el).select("svg");	
		this.table = table;
		if(data) {
			data = data.map(val=>{
				if(val.label == null || val.label == "") {
					val.label='NULL';
				}
				return val;
			});
		} else {
		  data = [
		      {label: "John Shepard",
		       value: 1},
		       {label: "Tali Zorah",
		       value: 1},
		       {label: "Liara T'Soni",
		       value: 1},
		       {label: "Urdnot Wrex",
		       value: 1},
		       {label: "Garrus",
		       value: 1},

		    ];
		}
		    var width = 400;
		    var height = 200;
		    var numOfRows = 10;
		    var delay = 500;
		    
		    var defaultColor = "#7a46a8";
		    var selectedColor = "#a6d275";
		    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);    
		    var y = d3.scale.linear()
		            .rangeRound([height, 0]);
		    var color = d3.scale.ordinal()
		            .range(["green","red"])
		            .domain(["nonNull","null"]);
		    var svg = this.svg;
		    
		      
		      var id = 0;
		      var data = data.map(function(d){
		           d.id = id;
		           id++;
		           return d;     
		      }).slice(0, numOfRows);
		        y.domain([0, d3.max(data, function(d) { return d.value; })]);
		        x.domain(data.map(function(d) { return d.label; }));
		        
		        
		            var bars = svg.selectAll("rect").data(data,function(d){ return d.label; });
		                
		            //edit existing bars
		            bars.transition()
		                .duration(40)
		                .attr("width", function(d) { return x.rangeBand(); })
		                .attr("x", function(d) { return x(d.label); })
		                .attr("y", function(d) { return y(d.value)==height?(height-3):y(d.value); })
		                .attr("height", function(d) { return y(d.value)==height?(3):(height - y(d.value)); })
		                .attr("id",function(d){ return "bar_"+d.id;})
		                .sort(function(a, b) { a.label - b.label; });
		            //add new bars, only applicable once
		            bars.enter().append("rect")
		                .attr("width", function(d) { return x.rangeBand(); })
		                .attr("x", function(d) { return x(d.label); })
		                .attr("y", function(d) { return y(d.value)==height?(height-3):y(d.value); })
		                .attr("height", function(d) { return y(d.value)==height?(3):(height - y(d.value)); })
		                .style("fill", defaultColor)
		                .attr("id",function(d){ return "bar_"+d.id;})
		                .attr("class","frequency_bar");
		             
		             //remove bars   
		            bars.exit().remove();
		                
		                
		            //remove all rows from table            
		            d3.select(this.table).selectAll(".rows").remove();
		            
		            //create new table content
		            var rows = d3.select(this.table)
		              .selectAll(".rows")
		              .data(data)
		              .enter()
		              .append("tr")
		              .attr("class","rows")
		              .attr("id",function(d){ return "line_"+d.id;});
		              
		              rows.append("td")
		              .text(function(d){ return d.label;});
		              
		              rows.append("td")
		              .text(function(d){ return d.value;});
		              
		              
		              //Re-set listeners
		              
		               //table rows mouseover listener
		      //  var table = this.table;
		      var eel = el;
		        d3.select(table).selectAll("tr.rows").on("mouseover",function(d){
		          d3.select(eel).selectAll("rect.frequency_bar").style("fill",defaultColor);
		          d3.select(eel).select("#bar_"+d.id).style("fill", selectedColor);
		          
		          d3.selectAll("tr.rows").style("background","none");
		          d3.select(this).style("background",selectedColor);
		        });
		        
		        //bar chart mouseover listener
		        d3.select(el).selectAll(".frequency_bar").on("mouseover",function(d){
		          d3.select(el).selectAll("rect.frequency_bar").style("fill",defaultColor);
		          d3.select(this).style("fill", selectedColor);
		          
		          d3.select(table).selectAll("tr.rows").style("background","none");
		          d3.select(table).select("#line_"+d.id).style("background",selectedColor);
		        });
		        d3.selectAll(".frequency_bar").on("mouseout",function(d){
		          d3.selectAll("tr.rows").style("background","none");
		          d3.selectAll("rect.frequency_bar").style("fill",defaultColor);
		        });
		        
		        d3.selectAll("tr.rows").on("mouseout",function(d){
		          d3.selectAll("tr.rows").style("background","none");
		          d3.selectAll("rect.frequency_bar").style("fill",defaultColor);
		        });
    
	}
}