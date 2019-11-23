import React, {Component} from 'react';

import  {Link} from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3';


import logo from "../logo.svg.png";


import {getAbi} from "./constants.js"
import {contractAddress} from "./constants.js"

var abi = getAbi();


const Todo = props => (
	<tr> 
		<td>{props.todo['returnValues']['notaryID']}</td>
		<td >{props.todo['returnValues']['propertyID']}</td>
		<td >{props.todo['returnValues']['ownerName']}</td>
		<td >{props.todo['returnValues']['buyerName'] == '' ? "N/A" : props.todo['returnValues']['buyerName']}</td>
		<td >{props.todo['returnValues']['buyerName'] == '' ? "Add Property" : "Transfer Property"}</td>
		<td >{props.todo['returnValues']['isPending'] === true ? "Pending" : props.todo['returnValues']['isSuccess'] === true ? "Approved" : "Rejected"}</td>
	</tr>
)

export default class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			transfer_url: "/create/" + this.props.match.params.usr,
			add_url: "/add/" + this.props.match.params.usr,
			userId: this.props.match.params.usr, 
			main_url: "/main/" + this.props.match.params.usr,
			info: [],
			res : [],
			isValid: true,
			one: false,
		}
	}

	componentDidMount() {

		var resp = []

		axios.get('http://localhost:4000/todos/getInfo/'+this.props.match.params.usr)
		.then(response => {
			//alert(response.data);
			resp = response.data;
			this.setState({info: response.data});
			//alert(resp);

			let currentComponent = this;

		// var userPublicKey = "0x3F43716bCf007AE649414254eFC2b33D9e94Aeaf";
		// var userPrivateKey = "0x0D3EF0CE996DB59C50A732A246F987E6E2B922723799101EF0A65A060BF2D54C";

		var userPublicKey = resp[0]['public_key']
		var userPrivateKey = "0x" + resp[0]['private_key']

		var Web3 = require('web3');


		var rpcUrl = "https://ropsten.infura.io/v3/204b3421ce854a73bf2ca420c5cae39f";
		var web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
		// define account
		var account = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
		web3.eth.accounts.wallet.add(account);
		// define contract
		var contract_address = contractAddress();
		var contract = new web3.eth.Contract(abi, contract_address);
		contract.defaultChain = 'ropsten';
		contract.defaultHardfork = 'petersburg';

		async function getTransactions() {
			const from = web3.eth.accounts.wallet[0].address;
			const nonce = await web3.eth.getTransactionCount(from, "pending");
			let gas = await contract.methods
				.getNotaryTransactions(userPublicKey)
				.estimateGas({from: from});

			gas = Math.round(gas * 1.5);

			try {
				const result = await contract.methods
					.getNotaryTransactions(userPublicKey).send({gas, from, nonce})
					.on('transactionHash', function(hash){
						console.log("transactionHash" + hash);
					});
				console.log("success", result);

				//alert(result['events']['printProposalEvent']);
				if (!result['events']['printProposalEvent']) {
					currentComponent.setState({
						isValid: false,
					});
				}
				if (!result['events']['printProposalEvent'][0]) {
					currentComponent.setState({
						one: true,
					});
				}


				currentComponent.setState({
					res: result['events']['printProposalEvent'],
				});
				

			} catch (e) {
				console.log("error", e);
				currentComponent.setState({
					isValid: false,
				});

			}
		}

		getTransactions();

		})
		.catch(function(error) {
			console.log(error);
		})


		// axios.get('http://localhost:4000/todos/find/'+this.state.userId)
		// 	.then(response => {
		// 		this.setState({todos: response.data});
		// 	})
		// 	.catch(function(error) {
		// 		console.log(error); 
		// 	})

		



	}


	
	componentDidUpdate() {
		// axios.get('http://localhost:4000/todosfind/'+this.state.userId)
		// 	.then(response => {
		// 		this.setState({todos: response.data});
		// 	})
		// 	.catch(function(error) {
		// 		console.log(error); 
		// 	})


	}

	// <table className="table table-striped" style={{marginTop: 20}}>
	// 				<thead>
	// 					<tr> 
	// 						<th> Notary ID</th>
	// 						<th> Property ID</th>
	// 						<th> Owner</th>
	// 						<th> Buyer</th>
	// 						<th> Documents</th>
	// 						<th> Actions</th>
	// 					</tr>
	// 				</thead>
	// 				<tbody>
	// 					{this.todoList1()}
	// 				</tbody>
	// 			</table>

	todoList() {
		let address = this.state.userId
		return this.state.todos.map(function(currentTodo, i) {
			return <Todo todo={currentTodo} back={address} key={i}/>;
		});
	}

	todoList1() {
		if (this.state.isValid && this.state.res.length != 0) {
			if (this.state.one) {
				return <Todo todo={this.state.res} key={0}/>;
			} else {
				return this.state.res.map(function(currentTodo, i) {
					return <Todo todo={currentTodo} key={i}/>;
				});
			}
		} 
	}

	render () {
		return (
			<div>
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
			        <a className="navbar-brand" href={this.props.main_url} target="_blank">
			          <img src={logo} width="150" height ="30"  />
			        </a>

			         <div className="collpase nav-collapse">
			              <ul className="navbar-nav mr-auto">
			                <li className="navbar-item">
			                  <Link to="/" className="nav-link">Log Out</Link>
			                </li>
			                <li className="navbar-item">
			                  <Link to={this.state.transfer_url} className="nav-link">Transfer Property</Link>
			                </li>
			                <li className="navbar-item">
			                  <Link to={this.state.add_url} className="nav-link">Add Property</Link>
			                </li>
			              </ul>
			          </div>

			      </nav>
			</div>


			<div>
				<br/>
				<h3>Transactions List</h3>


				<div>
					<table className="table table-striped" style={{marginTop: 20}}>
					<thead>
						<tr> 
							<th> Notary ID</th>
							<th> Property ID</th>
							<th> Owner</th>
							<th> Buyer</th>
							<th> Type </th>
							<th> Status </th>
						</tr>
					</thead>
					<tbody>
						{this.todoList1()}
					</tbody>
				</table>
					<p>{(this.state.isValid === true && this.state.res.length === 0) ? "loading..." : ""}</p>
					<font color="red">{(this.state.isValid === true) ? "" : "No Transactions Found For ID: " + this.props.match.params.usrID}</font>
					</div>
			</div>
			</div>
			)
	}
}

