import React, { Component } from 'react';
import FieldList from '../components/FieldList';
import FileInfo from '../components/FileInfo';
import FieldDetail from '../components/FieldDetail';
import Header from '../components/header';


import { Provider } from 'react-redux';

export default class FileDetailContainer extends Component {
	render() {
		/*if(this.props.technicalMetadata != null) {
		let fieldDetail;
		if(typeof this.props.fileState === 'undefined') {
			fieldDetail = <div>x</div>;
		} else {
			var activeColumn =  this.props.fileState.activeColumn;
			fieldDetail = <FieldDetail {...this.props.technicalMetadata.info} 
								{...this.props.technicalMetadata.columns.find(col=>col.eid==activeColumn)}/>;
		}*/
		
		return (
				<div>
					<div id='header' className='container-fluid'>
						<Provider store={this.props.store}>
							<Header/>
						</Provider>
					</div>
					<div id='main' className='containter-fluid'>
						<Provider store={this.props.store}>
							<FileInfo/>
						</Provider>
						<Provider store={this.props.store}>
							<FieldList />
						</Provider>
						
						<Provider store={this.props.store}>
							<FieldDetail/>
						</Provider>
					</div>
				</div>
			);
	/*} else {
		return (<div>loading...</div>);
	}*/} 
}

/*
<FileInfo {...this.props.technicalMetadata.info}/>
					{fieldDetail}


				fields={this.props.technicalMetadata.columns}
					onFieldSelect={eid=>
						this.props.dispatch(selectField(this.props.technicalMetadata.info.gid, eid))
					}

function mapStateToProps(state) {
	const activeFile = 0;
	if(state.files[activeFile]) {
		const gid = state.files[activeFile].technicalMetadata.info.gid;
		return {technicalMetadata: state.files[activeFile].technicalMetadata,
				businessMetadata: state.files[activeFile].businessMetadata,
				fileState: state.appState.files[gid]};
		} else {
			return {technicalMetadata: null,
				businessMetadata: null};
		}
}



export default connect(mapStateToProps)(FileDetailContainer);
*/