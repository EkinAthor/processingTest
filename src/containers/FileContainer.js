import React, { Component } from 'react';
import FileList from '../components/FileList';

import { connect } from 'react-redux';

class FileContainer extends Component {
	render() {
		return (
				<div>
					<FileList files={this.props.files}/>
				</div>
			);
	}
}

function mapStateToProps(state) {
	return {files: state.files};
}

export default connect(mapStateToProps)(FileContainer);