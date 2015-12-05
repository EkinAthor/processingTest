import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Frequency from './Frequency';
import DistinctCount from './DistinctCount';

class FieldDetail extends Component {
	render() {
		if(this.props.stateInfo != null) {
			return (
				<div className='col-lg-10 col-md-9 col-sm-8'>
				<div className='fieldDetails'>
				
				<div className='row'>
					<h1><span className='glyphicon glyphicon-stats pad-left-15'></span>{this.props.info.label}</h1>
					<div className='detailMetrics col-lg-6'>
					<div className='panel panel-default'>
						<div className='panel-heading'>Frequency Analysis <small>(Most common values)</small><span className='pull-right glyphicon glyphicon-fullscreen'></span></div>
							<div className='panel-body'>
								<Frequency d={this.props.businessMeta.freq}/>
							</div>
						</div>
					</div>	
					<div className='detailMetrics col-lg-6'>				
					<div className='panel panel-default'>
						<div className='panel-heading'>Masks Analysis <small>(Most common values)</small><span className='pull-right glyphicon glyphicon-fullscreen'></span></div>
							<div className='panel-body'>
								<Frequency d={this.props.businessMeta.masks}/>
							</div>
						</div>
					</div>
					<div className='detailMetrics col-lg-6'>
					<div className='panel panel-default'>
						<div className='panel-heading'>Data Analysis <span className='pull-right glyphicon glyphicon-fullscreen'></span></div>
							<div className='panel-body'>
								<DistinctCount {...this.props.businessMeta.distinctCount}/>
							</div>
						</div>
					</div>					
				
				</div>
				</div>
				</div>
				);
		} else {
			return (
				<div >
					<span> select column</span>
				</div>
				);
		}
	}
}

/*
FieldDetail.propTypes= {
		label: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		gid: PropTypes.string.isRequired
};
*/

function mapStateToProps(state) {
	//const activeFile = 0;
	const gid = state.appState.app.activeFile;
	if(typeof gid !== 'undefined') {
		//const gid = state.files[activeFile].technicalMetadata.info.gid;
		const file = state.files.find(file=>file.technicalMetadata.info.gid == gid);
		if(typeof file !== 'undefined') {
			if (typeof state.appState.files[gid] !== 'undefined') {
				 const eid = state.appState.files[gid].activeColumn;
				return {info:file.technicalMetadata.columns.find(col=>col.eid==eid),
						businessMeta: file.businessMetadata.elements.find(col=>col.eid==eid),
						stateInfo: state.appState.files[gid]};
				} else {
					return {stateInfo: null};
				}
			} else {
				return {stateInfo: null};
			} 
		
	} else {
			return {stateInfo: null};
	}


/*
	const activeFile = 0;
	
	
	if(state.files[activeFile]) {
		const gid = state.files[activeFile].technicalMetadata.info.gid ;
		if (typeof state.appState.files[gid] !== 'undefined') {
			const eid = state.appState.files[gid].activeColumn;
			return {info:state.files[activeFile].technicalMetadata.columns.find(col=>col.eid==eid),
					stateInfo: state.appState.files[gid]};
		} else {
			return {stateInfo: null};
		}
	} else {
			return {stateInfo:null};
	}*/
}



export default connect(mapStateToProps)(FieldDetail);