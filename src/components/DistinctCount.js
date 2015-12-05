import React, { Component, PropTypes } from 'react';
import d3 from 'd3';

export default class Frequency extends Component {
	render() {
		return (
				<div>
					<div className='freqChart' ref='chart'></div>
					<div className='freqTable' ref='table'></div>
					<span><span className='distinct'>distinct:</span> {this.props.distinct}, <span className='unique'>unique:</span> {this.props.unique}, <span className='nonUnique'>nonUnique:</span> {this.props.nonUnique}, <span className='duplicate'>duplicate:</span> {this.props.duplicate}</span>
				</div>
			);
	}
	componentDidMount() {
		
		var el = this.refs.chart;
		//var table = this.refs.table;
		var data = [
			{key: 'duplicate',value: this.props.duplicate},
			{key: 'unique', value: this.props.unique},
			{key: 'nonUnique', value: this.props.nonUnique}
		];
		this.chart = new FreqChart;
		this.chart.create(el,  data);
		this.chart.updateData(el, data);
	}
	componentDidUpdate() {
		var el = this.refs.chart;
		var data = [
			{key: 'duplicate',value: this.props.duplicate},
			{key: 'unique', value: this.props.unique},
			{key: 'nonUnique', value: this.props.nonUnique}
		];
		//var chart = new FreqChart;
		this.chart.updateData(el, data);
	}
}

class FreqChart {
	create(el,data) {
		var width = 200;
    	var height = 200;
    	var radius = Math.min(width, height) / 2;
    	/*var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
		*/
		 this.color =  function(name) {
			switch(name) {
				case 'duplicate':
					return '#7a46a8';
				case 'unique':
					return "#a6d275";
				case 'nonUnique':
					return "#ddd";
				}
			};
			var color = this.color;
    	var arc = d3.svg.arc().outerRadius(radius -10).innerRadius(50);

    	var pie = d3.layout.pie()
		    .sort(null)
		    .value(function(d) { return d.value; });
   		
   		this.svg = d3.select(el).append("svg")
            .attr("width", width)
    		.attr("height", height)
  			.append("g")
   			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

   			var svg = this.svg;
			      data.forEach(function(d) {
					    d.value = +d.value;
					  });
			    var g = svg.selectAll(".arc")
				    .data(pie(data))
				    .enter().append("g")
				    .attr("class", "arc");

				//g.append("path").transition()
				this.path = svg.datum(data).selectAll("path")
				      .data(pie)
				    	.enter().append("path")
				      .attr("fill", function(d) { return color(d.data.key); })
				      .attr("d", arc);
			      //.attr("d", arc)
			      //.style("fill", function(d) { return color(d.data.value); });
    
    //this.updateData();
	}
	updateData(el, data) {
		//this.svg = d3.select(el).select("svg");	
		var color = this.color;
		if(data) {

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
		    var width = 200;
	    	var height = 200;
	    	var radius = Math.min(width, height) / 2;
	    	

	    	var arc = d3.svg.arc().outerRadius(radius -10).innerRadius(50);

	    	var pie = d3.layout.pie()
			    .sort(null)
			    .value(function(d) { return d.value; });
			 pie(data);
			this.path.data(pie(data));
			this.path.attr("d",arc);

			    
		     
    
	}
}