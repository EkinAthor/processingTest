import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import classNames from 'classNames'; 

class NullCounter extends Component {
	render() {
		if(typeof this.props.nullCount !== 'undefined') {
			return (<div>
					<div className="fieldHeaderLabel col-lg-4 col-md-4 col-sm-4 col-xs-4 text-right " ><small>Nulls</small></div>
						<div className="fieldHeaderValue col-lg-8 col-md-8 col-sm-8 col-xs-8 ">{this.props.nullCount.null} </div>
					</div>);
				
		} else {
			return (<span></span>);
		}
	}
}

export default class SmallField extends Component {
	render() {
		return (
			<div className={classNames('fieldHeaderWrapper thumbnail', {'active': this.props.active })} onClick={event=>this.handleClick(event)}>
			<div className='row'><div className='textInfo col-lg-8 col-md-8 col-sm-8 col-xs-4'>
				<div className='fieldHeaderItem row'>
						<div className="fieldHeaderLabel col-lg-4 col-md-4 col-sm-4 col-xs-4 text-right " ><small>Column</small></div>
						<div className="fieldHeaderValue col-lg-8 col-md-8 col-sm-8 col-xs-8 ">{this.props.label}</div>
						<div className="fieldHeaderLabel col-lg-4 col-md-4 col-sm-4 col-xs-4 text-right " ><small>Type</small></div>
						<div className="fieldHeaderValue col-lg-8 col-md-8 col-sm-8 col-xs-8 ">{this.props.dataType}</div>
						<NullCounter nullCount={this.props.nullCount}/>
				</div>	
			</div><div className='chart col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left' >
				<div className='NullChart' ref='chart'>
				</div>	
			</div></div>
			
				
			</div>
			);
	}
	handleClick(event) {
		const eid = this.props.eid;
		this.props.onFieldSelect(eid);
	}

	componentDidMount() {
		var el = this.refs.chart;
		var chart = new NullChart;
		chart.create(el, this.d3DataConvert(this.props.nullCount));
	}
	componentDidUpdate() {
		var el = this.refs.chart;
		var chart = new NullChart;
		chart.updateData(el, this.d3DataConvert(this.props.nullCount));
	}
	d3DataConvert(data) {
		if(data) {
		  return [{type: "null", value: data.null},{type: "non-null", value: data.nonNull}];
		}
	}
}



class NullChart {
	create(el, data, state) {
			var _this=this;
			var width = 30;
		    var height = 70;
		    this.y = d3.scale.linear()
		            .rangeRound([height, 0]);
		    
		    var svg = d3.select(el).append("svg")
		            .attr("width", width)
		            .attr("height",height)
		            .append("g");


		    this.updateData(el,data);
	}
	updateData(el, data) {
			var _this = this;
			var _this=this;
			var width = 30;
		    var height = 70;
		    this.y = d3.scale.linear()
		            .rangeRound([height, 0]);


            var start = 0;
            var color = d3.scale.ordinal()
            .range(["#a6d275","#ddd"])
            .domain(["nonNull","null"]);
            data.forEach(function(d) {
                d.start = start;
                d.end = start + d.value;
                start = d.end;
            });
            var total = data[data.length - 1].end;
            this.y.domain([0, total]);
            var bars = d3.select(el).select('svg').selectAll("rect")
                    .data(data);
            //edit existing
            bars        
                    .transition()
                    .attr("y", function(d) { return _this.y(d.end); })
                    .attr("height", function(d) { return _this.y(d.start) - _this.y(d.end); });

            //append new ones, applicable only once
            bars
                    .enter()
                    .append("rect")
                    .attr("width", 30)
                    .attr("y", function(d) { return _this.y(d.end); })
                  .attr("height", function(d) { return _this.y(d.start) - _this.y(d.end); })
                .style("fill", function(d) { return color(d.type); });
	}

}



SmallField.propTypes= {
		label: PropTypes.string.isRequired,
		dataType: PropTypes.string.isRequired,
		eid: PropTypes.string.isRequired,
		nullCount: PropTypes.shape({
			null: PropTypes.number,
			nonNull: PropTypes.number
		})
};
/*
Old render:
<span>{this.props.label}</span> 
				<span> {this.props.dataType}</span> 
				<span> {this.props.eid}</span>


<span> {this.props.nullCount.null}</span>
				<span> {this.props.nullCount.nonNull}</span></div>);
 */