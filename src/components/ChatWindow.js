
/**
 * semi-'dumb' component containing all the chat messages AND chat input!
 */

import React, { Component, PropTypes } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

export default class ChatWindow extends Component {
	render() {
		return (
			<div className='chatWindow'>
			<div className='chatMessages'>
				{this.props.chatMessages.map((chatMessage, index) => 
					/*
					I can map the chat message like this here just because I am using same object structure
					 */
					<ChatMessage {...chatMessage}
								key= {index} />
				)}
			</div>
			<ChatInput onAddChat={(text) => this.props.onAddChat(text)} />
			</div>
			);
	}
}

ChatWindow.propTypes = {
	chatMessages: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		time: PropTypes.string.isRequired
	}).isRequired).isRequired,
	onAddChat: PropTypes.func.isRequired
};