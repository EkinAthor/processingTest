/**
 * file label view
 */

import React, { Component, PropTypes } from 'react';

export default class FileLabel extends Component {
	render() {
		return (
			<div>
				<span>{this.props.name}, {this.props.gid}</span>
			</div>
			);
	}
}

FileLabel.propTypes= {
	name: PropTypes.string.isRequired,
	gid: PropTypes.string.isRequired
};