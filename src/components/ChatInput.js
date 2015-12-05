/**
 * 'dumb' component for adding the message
 */
import React, { Component, PropTypes } from 'react';

export default class ChatInput extends Component {
	render() {
		return(
			<div>
			<input type='text' ref='input' />
			<button onClick={event => this.handleClick(event)}>Add</button>
			</div>
			);
	}
	handleClick(event) {
		const text = this.refs.input.value;
		this.props.onAddChat(text);
		this.refs.input.value = '';
	}
}

/**
 * basically type definitions
 */
ChatInput.propTypes = {
	onAddChat: PropTypes.func.isRequired
};
