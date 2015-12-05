import React, { Component, PropTypes } from 'react';
import SmallField  from './SmallField';
import { connect } from 'react-redux';
import {selectField} from '../actions/actions';


class FieldList extends Component {
	render() {
		return (
			<div className='col-lg-2 col-md-3 col-sm-4'>
				<div className='fields'>
				{this.props.fields.map(field=>
					<SmallField {...field} active={this.props.activeColumn == field.eid}
					key={field.eid} 
					nullCount={this.props.businessFields.find(x=>x.eid == field.eid).nullCount}
					onFieldSelect={eid=>this.props.dispatch(selectField(this.props.gid, eid))}/>
					)}
				</div>				
			</div>
			);
	}
}

/*
FieldList.propTypes= {
	fields: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		dataType: PropTypes.string.isRequired,
		eid: PropTypes.string.isRequired
	})).isRequired
};*/

function mapStateToProps(state) {
	//const activeFile = 0;
	const gid = state.appState.app.activeFile;
	if(typeof gid !== 'undefined') {
		//const gid = state.files[activeFile].technicalMetadata.info.gid;
		const fileState = state.appState.files[gid];
		var activeColumn = "-1";
		if(typeof fileState !== 'undefined') {
			activeColumn = fileState.activeColumn;
		}
		const file = state.files.find(file=>file.technicalMetadata.info.gid == gid);
		if(typeof file !== 'undefined') {
			return {fields: file.technicalMetadata.columns,
				businessFields: file.businessMetadata.elements,
				gid: gid,
				activeColumn: activeColumn};
			} else {
				return {fields: []};
			}
		
	} else {
			return {fields: []};
	}
}



export default connect(mapStateToProps)(FieldList);