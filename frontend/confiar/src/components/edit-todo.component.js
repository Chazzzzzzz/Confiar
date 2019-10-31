import React, {Component} from 'react';
import axios from 'axios'; 


import { Dropdown, DropdownButton } from 'react-bootstrap';

import  {Link} from 'react-router-dom';

import logo from "../logo.svg";

const User = props => (
	 <Dropdown.Item eventKey={props.users.username}>{props.users.username}</Dropdown.Item>
)

export default class EditTodo extends Component {
	constructor(props) {
		super(props);

		this.onChangeTransSeller = this.onChangeTransSeller.bind(this);
		this.onChangeTransInfo = this.onChangeTransInfo.bind(this);
		this.onChangeTransDocs = this.onChangeTransDocs.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeTransCompleted = this.onChangeTransCompleted.bind(this);


		this.state = {
			users: [],
			trans_buyer: '',
			trans_seller: '',
			trans_info: '',
			trans_docs: '',
			trans_completed: false,
			main_url: "/main/" + this.props.match.params.usr
		}
	}

	userList() {
		return this.state.users.map(function(currentUser, i) {
			return <User users={currentUser} key={i}/>;
		});
	}

	onChangeTransSeller(e) {
		this.setState({
			trans_seller: e
		});
	}

	onChangeTransInfo(e) {
		this.setState({
			trans_info: e.target.value
		});
	}

	onChangeTransDocs(e) {
		this.setState({
			trans_docs: e.target.value
		});
	}

	onChangeTransCompleted(e) {
		this.setState({
			trans_completed: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const newTodo = {
			trans_buyer: this.state.trans_buyer,
			trans_seller: this.state.trans_seller,
			trans_info: this.state.trans_info,
			trans_docs: this.state.trans_docs,
			trans_completed: this.state.trans_completed,
		}

		axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id, newTodo)
			.then(res => console.log(res.data));

		this.props.history.push(this.state.main_url);
	}


	componentDidMount() {

			axios.get('http://localhost:4000/todos/users/get')
			.then(response => {
				this.setState({users: response.data});
			})
			.catch(function(error) {
				console.log(error); 
			})

		//alert(this.props.match.params.id);
		axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
			.then(response => {
				//alert(response.data.trans_seller);
				this.setState({
					trans_buyer: response.data.trans_buyer,
					trans_seller:response.data.trans_seller,
					trans_info: response.data.trans_info,
					trans_docs: response.data.trans_docs,
					trans_completed: response.data.trans_completed,
				});
			})
			.catch(function(error) {
				console.log(error);
			})
	}

	render () {
		return (
			<div>
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
			        <a className="navbar-brand" href="https://www.google.com/" target="_blank">
			          <img src={logo} width="40" height ="40" alt="CodingTheSmartWay.com" />
			        </a>

			        <Link to={this.state.main_url} className="navbar-brand">Notary App</Link>

			         <div className="collpase nav-collapse">
			              <ul className="navbar-nav mr-auto">
			                <li className="navbar-item">
			                  <Link to="/" className="nav-link">Log Out</Link>
			                </li>
			                <li className="navbar-item">
			                  <Link to={this.state.main_url} className="nav-link">Main Page</Link>
			                </li>
			              </ul>
			          </div>

			      </nav>
			</div>


			<div style={{marginTop: 20}}>
				<h3> Add New Transaction </h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Description: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.trans_info} 
								onChange={this.onChangeTransInfo}
								/>
					</div>

					<div className="form-group">
						<label>Property docs: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.trans_docs} 
								onChange={this.onChangeTransDocs}
								/>
					</div>


					<div className="form-group">
						<label>Seller: </label>
						<div className="form-group">
						<DropdownButton id="dropdown-basic-button" title="Seller list" onSelect={this.onChangeTransSeller}>
					 	{this.userList()}
					</DropdownButton>
					</div>
						<input  type="text" 
								className="form-control" 
								value={this.state.trans_seller} 
								onChange={this.onChangeTransSeller}
								/>
					</div>

					<div className="form-check">
						<input type="checkbox"
								className="form-check-input"
								id="completedCheckbox"
								name="completedCheckbox"
								onChange={this.onChangeTransCompleted}
								checked={this.state.trans_completed}
								value={this.state.trans_completed}
								/>
								<label className="form-check-label" htmlFor="completedCheckbox">
									completedCheckbox
								</label>
					</div>

					<div className="form-group"> 
						<input type="submit"
								value="Edit Transaction"
								className="btn btn-outline-primary"
								/>
					</div>
				</form>
			</div>
			</div>
			)
	}
}


