import React, {Component} from 'react';

import  {Link} from 'react-router-dom';
import axios from 'axios';


import logo from "../logo.svg";



const Todo = props => (
	<tr> 
		<td className={props.todo.trans_completed ? 'completed' : ''}>{props.todo.trans_notary_id}</td>
		<td className={props.todo.trans_completed ? 'completed' : ''}>{props.todo.property_id}</td>
		<td className={props.todo.trans_completed ? 'completed' : ''}>{props.todo.trans_seller}</td>
		<td className={props.todo.trans_completed ? 'completed' : ''}>{props.todo.trans_buyer}</td>
		<td className={props.todo.trans_completed ? 'completed' : ''}>{props.todo.trans_docs}</td>
		<td className={props.todo.trans_completed ? 'completed' : ''}>
			<Link to={"/approve/" + props.back + "/" + props.todo._id}>Approve </Link>
			<Link to={"/reject/" + props.back + "/" + props.todo._id}>Reject</Link>
			
		</td>
	</tr>
)

export default class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			create_url: "/create/" + this.props.match.params.usr,
			userId: this.props.match.params.usr, 
			main_url: "/main/" + this.props.match.params.usr
		}
	}

	componentDidMount() {
		axios.get('http://localhost:4000/todos/')
			.then(response => {
				this.setState({todos: response.data});
			})
			.catch(function(error) {
				console.log(error); 
			})
	}

	componentDidUpdate() {
		axios.get('http://localhost:4000/todos/')
			.then(response => {
				this.setState({todos: response.data});
			})
			.catch(function(error) {
				console.log(error); 
			})
	}

	todoList() {
		let address = this.state.userId
		return this.state.todos.map(function(currentTodo, i) {
			return <Todo todo={currentTodo} back={address} key={i}/>;
		});
	}

	render () {
		return (
			<div>
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
			        <a className="navbar-brand" href="https://www.google.com/" target="_blank">
			          <img src={logo} width="40" height ="40" alt="CodingTheSmartWay.com" />
			        </a>

			        <Link to={this.props.main_url} className="navbar-brand">Notary App</Link>

			         <div className="collpase nav-collapse">
			              <ul className="navbar-nav mr-auto">
			                <li className="navbar-item">
			                  <Link to="/" className="nav-link">Log Out</Link>
			                </li>
			              </ul>
			          </div>

			      </nav>
			</div>


			<div>
				<br/>
				<h3>Transactions List</h3>
				<table className="table table-striped" style={{marginTop: 20}}>
					<thead>
						<tr> 
							<th> Notary ID</th>
							<th> Property ID</th>
							<th> Owner</th>
							<th> Buyer</th>
							<th> Documents</th>
							<th> Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.todoList()}
					</tbody>
				</table>
			</div>
			</div>
			)
	}
}

