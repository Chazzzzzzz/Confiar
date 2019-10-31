import React, {Component} from 'react';
import axios from 'axios';

export default class DeleteTodo extends Component {
	constructor(props) {
		super(props);
		this.onSubmitOne = this.onSubmitOne.bind(this);
		this.onSubmitTwo = this.onSubmitTwo.bind(this);
	}
	onSubmitOne(e) {
		e.preventDefault();
		axios.delete('http://localhost:4000/todos/delete/' + this.props.match.params.id)
			.then(res => console.log("deleted"));

		this.props.history.push('/main/' + this.props.match.params.usr);
	}
	onSubmitTwo(e) {
		e.preventDefault();
		this.props.history.push('/main/' + this.props.match.params.usr);
	}
	render() {
		return (
		<div>
		<h2>Are you sure you want to delete?</h2>
		<form onSubmit={this.onSubmitOne}>
      <button type="submit" class="btn btn-outline-danger">Delete</button>
       &nbsp;&nbsp;&nbsp;
      <button class="btn btn-outline-secondary" onClick={this.onSubmitTwo}>Back</button>
    </form>
		</div>
	)
	}
}