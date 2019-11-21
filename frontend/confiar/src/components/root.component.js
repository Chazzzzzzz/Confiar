import React, {Component} from 'react';
import axios from 'axios';

import  {Link} from 'react-router-dom';

import logo from "../logo.svg";

export default class Root extends Component {
	constructor(props) {
		super(props);
		this.onChangeUserId = this.onChangeUserId.bind(this);
		this.onSubmitOne = this.onSubmitOne.bind(this);
		this.onSubmitTwo = this.onSubmitTwo.bind(this);
		this.onSubmitThree = this.onSubmitThree.bind(this);

		this.state = {
			user_id : '', 
		}
	}
	onSubmitOne(e) {
		e.preventDefault();
		this.props.history.push('/signup');
	}
	onSubmitTwo(e) {
		e.preventDefault();
		this.props.history.push('/login/');
	}
	onSubmitThree(e) {
		e.preventDefault();
		this.props.history.push('/search/' + this.state.user_id);
	}
	onChangeUserId(e) {
		this.setState({
			user_id: e.target.value
		});
	}
	render() {
		return (
		<div>
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="https://www.google.com/" target="_blank">
                <img src={logo} width="40" height ="40" alt="CodingTheSmartWay.com" />
              </a>

              <Link to="/" className="navbar-brand">Notary App</Link>


            </nav>

        <div style={{marginTop: 20}}>

		<form onSubmit={this.onSubmitOne}>

		<div className="form-group">
		<h4>Notary Application</h4>
		<div>
		<button class="btn btn-outline-dark" onClick={this.onSubmitOne}>Sign Up</button>
		</div>

		
		</div>
		<div className="form-group">
		<button class="btn btn-outline-primary" onClick={this.onSubmitTwo}>Login</button>
		</div>


		<div className="form-group">
			<label>Search Transactions: </label>
			<input  type="text"
					className="form-control"
					value={this.state.user_id}
					onChange={this.onChangeUserId}
					/>
		</div>

		<div className="form-group">
		<button class="btn btn-outline-info" onClick={this.onSubmitThree}>Search</button>
		</div>

		</form>

		</div>
		</div>

     
	)
	}
}