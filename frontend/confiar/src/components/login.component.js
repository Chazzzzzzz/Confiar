import React, {Component} from 'react'; 
import axios from 'axios';

import  {Link} from 'react-router-dom';

import logo from "../logo.svg.png";

export default class SignUp extends Component {

	constructor(props) {
		super(props);

		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: '',
			password: '',
			verified: [],
			failed: false,
			olduser: ''
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

	componentDidUpdate(){
		if (this.state.verified.length > 0){
			if (this.state.verified[0]['is_notary']) {
				this.props.history.push('/main/' + this.state.olduser);
			} else {
				this.props.history.push('/main/registrar/' + this.state.olduser);
			}
		}
	}

	onSubmit(e) {
		e.preventDefault();


		this.setState({failed: false});
		axios.get('http://localhost:4000/todos/verify/'+this.state.username+"/"+this.state.password)
			.then(response => {
				this.setState({verified: response.data});
			})
			.catch(function(error) {
				console.log(error); 
			})


		if (this.state.verified.length === 0) {
			this.setState({failed: true});
		} 


		this.setState({
			olduser: this.state.username,
			username: '',
			password: '',
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
              <a className="navbar-brand" href="/">
			          <img src={logo} width="150" height ="30"  />
			   </a>


            </nav>
			<div style={{marginTop: 20}}>
				<h3> Login </h3>
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
								type="password"
								value={this.state.password} 
								onChange={this.onChangePassword}
								/>
					</div>

					<div className="form-group"> 
						<input type="submit"
								value="Login"
								className="btn btn-outline-primary"
								/>
					</div>

				<div className="form-group"> 
				<font color="red">{this.state.failed  ? "Incorrect Username or Password. Please try again." : ""}</font>
				</div>					
					
				</form>
			</div>
			</div>
			)
	}
}