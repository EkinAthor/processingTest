/**
 * container that displays last message. Connected directly to redux
 */
import React, { Component } from 'react';


import { connect } from 'react-redux';


class LastMessageContainer extends Component {
	render() {
		return (
				<div>{this.props.time}: {this.props.text}</div>
			);
	}
}

function select(state) {
	return {
		time: state.lastMessage.time,
		text: state.lastMessage.text
	};
}

export default connect(select)(LastMessageContainer);