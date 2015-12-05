import React, { Component, PropTypes } from 'react';
import FileLabel from './FileLabel';

export default class FileList extends Component {
	render() {
		return (
			<div>
				{this.props.files.map(file=>
					<FileLabel {...file.technicalMetadata.info} key={file.technicalMetadata.info.gid}/>
				)}
			</div>
			);
	}
}