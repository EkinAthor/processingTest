import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectFile } from '../actions/actions';

class Header extends Component {
	render() {
		/**
		 * modified code from bootstrap navbar
		 * 
		 */
		return (
			<nav className='navbar navbar-default navbar-fixed-top container-fluid'>
			  <div className='container-fluid'>
			  
			    <div className='navbar-header'>
			      <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
			        <span className='sr-only'>Toggle navigation</span>
			        <span className='icon-bar'></span>
			        <span className='icon-bar'></span>
			        <span className='icon-bar'></span>
			      </button>
			      <a className='navbar-brand' href='http://localhost:9999/index.html#files/5628c21fc137e257ebf67c8b/detail'>/AVS</a>
			    </div>

			    
			    <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
			      <ul className='nav navbar-nav'>
			       
			        <li id='' className="dropdown">
			          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className='glyphicon glyphicon-file' >Files</span> <span className="caret"></span></a>
			          <ul className="dropdown-menu">
			          	{this.props.files.map(file=>
			          		<li key={file.technicalMetadata.info.gid}>
			          			<a onClick={event=>this.selectFile(file.technicalMetadata.info.gid)} href='#'>{file.technicalMetadata.info.label}</a>
			          		</li>
			          		)}
			           
			          </ul>
			        </li>
			      </ul>
			     
			      
			      <ul className='nav navbar-nav navbar-right'>
			         <li id='filesx' className='dropdown'>
			          <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'><span className='glyphicon glyphicon-upload'>Upload</span></a>
			          <ul id='files' className='dropdown-menu'>
			            <li><a href='#'>drop here</a></li>
			         
			           
			            
			          </ul>
			        </li>
			        <li className='dropdown'>
			          <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'><span className='glyphicon glyphicon-cog'></span> <span className='caret'></span></a>
			          <ul className='dropdown-menu'>
			            <li><a href='#'>Settings</a></li>
			            <li><a href='#'>Help</a></li>
			           
			            <li role='separator' className='divider'></li>
			            <li><a href='#'>Log out</a></li>
			          </ul>
			        </li>
			      </ul>
			    </div>
			  </div>
			</nav>
			);
	}
	selectFile(gid) {
		this.props.dispatch(selectFile(gid));
	}
}

function mapStateToProps(state) {
	if(typeof state.files !== 'undefined') {
		return {files: state.files};
	} else {
		return {files: []};
	}
	
}


export default connect(mapStateToProps)(Header);

/*
 <li className=''><a href='#'><span className='glyphicon glyphicon-stats pad-right-5'></span>Resources <span className='sr-only'>(current)</span></a></li>
			        <li><a href='http://localhost:9999/index.html#files/5628c21fc137e257ebf67c8b/detail'><span className='glyphicon glyphicon-tags pad-right-5'></span> Projects</a></li>


			         <form className='navbar-form navbar-left' role='search'>
			        <div className='form-group'>
			          <input type='text' className='form-control' placeholder='Search'/>
			        </div>
			        <button type='submit' className='btn btn-default'>Submit</button>
			      </form>
 */