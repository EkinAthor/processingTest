/**
 * top level component of the chat window. Very simple, you type text, text appears in the view
 * contains two sub-views = chatWindow, where text will appear and chatInput, where you type text
 */
import React, { Component } from 'react';
import ChatWindow from '../components/ChatWindow';

import { connect } from 'react-redux';
import { addChat,addChatMiddleware } from '../actions/asyncActions';



/**
 * higher order component that will be connected to redux
 * only "holder" for its children, but handles data and sends them as props to the children
 */
class ChatConainer extends Component {
	render() {
		return (
			<div>
				<ChatWindow 
					chatMessages={ this.props.chatMessages
					}

					onAddChat={text => this.props.dispatch(addChatMiddleware(text))} 
					/>

			</div>
			);
	}
}

/**
 * used in connect to select subset of the tree from state used by this container
 * this is a place to do sorting or data manipulation for visual purposes
 */
function select(state) {
	return {
		chatMessages: state.chatMessages
	};
}

//connect the container to the store, hass to be called twice (redux speciffic)
export default connect(select)(ChatConainer);