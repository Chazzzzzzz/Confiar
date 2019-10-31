import React, {Component} from 'react';
import axios from 'axios';

import  {Link} from 'react-router-dom';

import logo from "../logo.svg";

export default class SignUp extends Component {

	constructor(props) {
		super(props);

		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePublicKey = this.onChangePublicKey.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: '',
			password: '',
			public_key: '',
		}
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value
		});
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			username: this.state.username,
			password: this.state.password,
			public_key: this.state.public_key,
		}

		axios.post('http://localhost:4000/todos/users/add', newUser)
			.then(res => console.log(res.data));

		this.props.history.push('/main/' + this.state.username);

		this.setState({
			username: '',
			password: '',
			public_key: '',
		});

	}

	onChangePublicKey(e) {
		this.setState({
			public_key: e.target.value
		});
	}

	render () {
		return (
			<div>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="https://www.google.com/" target="_blank">
                <img src={logo} width="40" height ="40" alt="CodingTheSmartWay.com" />
              </a>

              <Link to="/" className="navbar-brand">Notary App</Link>


            </nav>
			<div style={{marginTop: 20}}>
				<h3> Sign up </h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.username} 
								onChange={this.onChangeUsername}
								/>
					</div>

					<div className="form-group">
						<label>Password: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.password} 
								onChange={this.onChangePassword}
								/>
					</div>


					<div className="form-group">
						<label>Public Key: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.public_key} 
								onChange={this.onChangePublicKey}
								/>
					</div>

					<div className="form-group"> 
						<input type="submit"
								value="Sign Up"
								className="btn btn-outline-primary"
								/>
					</div>
					
				</form>
			</div>
			</div>
			)
	}
}