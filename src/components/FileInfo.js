import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class FileInfo extends Component {
	render() {
		const info = this.props.info;
		if(info.label != "") {
			return (
				<div>
					<div className='headerName row'>
						<div className='col-lg-3 col-md-4 col-sm-5 col-xs-11'>
							<div className='FileName'><h1><span className='glyphicon glyphicon-file pad-right-15'></span><nbsp/><nbsp/>{info.label}</h1></div>
						</div>
						<div className='col-lg-3 col-md-5 col-sm-7 col-xs-9 text-right headFix'>
							
							<div className='row'>
								<div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right'>
									<div><small>Name:</small></div>
									
									
									<div><small>Records:</small></div>
								</div>
						
								<div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left'>
									<div>{info.name}</div>
									
									<div>{this.props.records}</div>
									
								</div>
							</div>
						</div>
						<div className='col-lg-3 col-md-5 col-sm-7 col-xs-9 text-right headFix'>
							
							<div className='row'>
								<div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right'>
							
							<div><small>Source:</small></div>
							<div><small>Created:</small></div>

						</div>
						
								<div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left'>
							
							<div><span className='glyphicon glyphicon-import '></span> Upload</div>
							<div>{info.created.toString()}</div>

							</div></div>
						</div>
				</div>


				</div>
				);
		} else {
			return(
				<div>
					<div className='headerName row'>
						<div><h1>Select a file from <b>files</b> menu, or <b>upload</b> new file</h1></div>
						</div>
				</div>



				
				);
		}
	}
}

FileInfo.propTypes= {
	info: PropTypes.shape({
		label: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		gid: PropTypes.string.isRequired
	}).isRequired
};

function mapStateToProps(state) {
//const activeFile = 0;
	const gid = state.appState.app.activeFile;
	if(typeof gid !== 'undefined') {
		//const gid = state.files[activeFile].technicalMetadata.info.gid;
		const file = state.files.find(file=>file.technicalMetadata.info.gid == gid);
		if(typeof file !== 'undefined') {
			const records = file.businessMetadata.elements[0].nullCount.null + file.businessMetadata.elements[0].nullCount.nonNull;
			return {info: file.technicalMetadata.info, attrCnt: file.technicalMetadata.columns.length, records: records};
			} else {
				return {info: {label: "", type: "", gid: "", created:""}, attrCnt: 0, records: 0};
			}
		
	} else {
			return {info: {label: "", type: "", gid: "", created:""}, attrCnt: 0, records: 0};
	}

/*
	const activeFile = 0;
	if(state.files[activeFile]) {
		return  state.files[activeFile].technicalMetadata.info;
	} else {
			return {label: "", type: "", gid: ""};
	}*/
}

/*
Old render

				<span>{this.props.label}</span> 
				<span> {this.props.type}</span> 
				<span> {this.props.gid}</span>
 */


export default connect(mapStateToProps)(FileInfo);