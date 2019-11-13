import React, {Component} from 'react';
import axios from 'axios';

import { Dropdown, DropdownButton } from 'react-bootstrap';

import  {Link} from 'react-router-dom';

import logo from "../logo.svg";


const User = props => (
	 <Dropdown.Item eventKey={props.users.username}>{props.users.username}</Dropdown.Item>
)

var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "propertyID",
				"type": "string"
			}
		],
		"name": "addProperty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "registrationOfficeID",
				"type": "address"
			}
		],
		"name": "addRegistrationOffice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "proposalID",
				"type": "bytes32"
			}
		],
		"name": "approve",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "proposalID",
				"type": "bytes32"
			}
		],
		"name": "cancel",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ownerID",
				"type": "address"
			},
			{
				"name": "propertyID",
				"type": "string"
			}
		],
		"name": "checkOwnership",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "proposalID",
				"type": "bytes32"
			}
		],
		"name": "claimTimeout",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getOwnership",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ID",
				"type": "address"
			}
		],
		"name": "isRegistrationOffice",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "proposalID",
				"type": "bytes32"
			}
		],
		"name": "reject",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "buyerID",
				"type": "address"
			},
			{
				"name": "propertyID",
				"type": "string"
			}
		],
		"name": "transferProperty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "ownerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "proposalID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "propertyID",
				"type": "string"
			}
		],
		"name": "addPropertyEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "ownerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "buyerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "proposalID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "propertyID",
				"type": "string"
			}
		],
		"name": "transferPropertyEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "registrationOfficeID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ownerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "buyerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "proposalID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "propertyID",
				"type": "string"
			}
		],
		"name": "approveEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "registrationOfficeID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ownerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "buyerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "proposalID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "propertyID",
				"type": "string"
			}
		],
		"name": "rejectEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "cancellerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ownerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "buyerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "proposalID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "propertyID",
				"type": "string"
			}
		],
		"name": "cancelEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "claimerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ownerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "buyerID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "proposalID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "propertyID",
				"type": "string"
			}
		],
		"name": "timeoutEvent",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "creator",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

export default class CreateTodo extends Component {

	constructor(props) {
		super(props);

		this.onChangeTransSeller = this.onChangeTransSeller.bind(this);
		this.onChangeTransInfo = this.onChangeTransInfo.bind(this);
		this.onChangeTransDocs = this.onChangeTransDocs.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			users: [],
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

	componentDidMount() {
		axios.get('http://localhost:4000/todos/users/get')
			.then(response => {
				this.setState({users: response.data});
			})
			.catch(function(error) {
				console.log(error); 
			})
	}

	componentDidUpdate() {
		axios.get('http://localhost:4000/todos/users/get')
			.then(response => {
				this.setState({users: response.data});
			})
			.catch(function(error) {
				console.log(error); 
			})
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

	onSubmit(e) {
		e.preventDefault();

		const newTodo = {
			trans_buyer: this.props.match.params.usr,
			trans_seller: this.state.trans_seller,
			trans_info: this.state.trans_info,
			trans_docs: this.state.trans_docs,
			trans_completed: this.state.trans_completed,
		}

		axios.post('http://localhost:4000/todos/add', newTodo)
			.then(res => console.log(res.data));

		this.setState({
			trans_seller: '',
			trans_info: '',
			trans_docs: '',
			trans_completed: false
		});


		var Web3 = require('web3');
		// define using metamask
		if (typeof window.ethereum !== 'undefined') {
			const provider = window['ethereum'];
			var web3 = new Web3(provider);
		} else {
			console.log("no metamask connected");
		}
		// define contract
		var contract_address = '0x434Afb68242257e8CEf2865Cf35ed7A020dDe49b';
		var contract = new web3.eth.Contract(abi, contract_address, {
			from: '0x3F43716bCf007AE649414254eFC2b33D9e94Aeaf',
			gasPrice: '20000000000'
		});
		contract.defaultChain = 'ropsten';
		// call "addProperty" method in the contract and create a property named "123"
		contract.methods.addProperty("123").send({from:"0x3F43716bCf007AE649414254eFC2b33D9e94Aeaf"})
			.on('transactionHash', function(hash){
				console.log("transactionHash" + hash);
			})
			.on('receipt', function(receipt){
				console.log(receipt);
			});

	}

	onChangeTransDocs(e) {
		this.setState({
			trans_docs: e.target.value
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

					<div className="form-group"> 
						<input type="submit"
								value="Create Transaction"
								className="btn btn-outline-primary"
								/>
					</div>
				</form>
			</div>
			</div>
			)
	}
}