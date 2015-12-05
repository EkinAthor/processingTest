/**
 * 'dumb' component displaying single chat message
 */
import React, { Component, PropTypes } from 'react';

export default class ChatMessage extends Component {
	render() {
		return(
			<div>{this.props.time}: {this.props.text}</div>
			);
	}
}

/**
 * basically type definitions
 */
ChatMessage.propTypes = {
	time: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

