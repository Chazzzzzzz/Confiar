import React, {Component} from 'react';
import axios from 'axios';
import Web3 from 'web3'

import { Dropdown, DropdownButton, FormControl,  ul} from 'react-bootstrap';

import  {Link} from 'react-router-dom';

import logo from "../logo.svg";

var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "propertyID",
				"type": "string"
			},
			{
				"name": "ownerID",
				"type": "string"
			},
			{
				"name": "ownerName",
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
				"name": "ownerID",
				"type": "string"
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
				"name": "ownerID",
				"type": "string"
			}
		],
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
				"name": "propertyID",
				"type": "string"
			},
			{
				"name": "ownerID",
				"type": "string"
			},
			{
				"name": "buyerID",
				"type": "string"
			},
			{
				"name": "ownerName",
				"type": "string"
			},
			{
				"name": "buyerName",
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
				"name": "notaryID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "proposalID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "ownerID",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "ownerName",
				"type": "string"
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
				"name": "notaryID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ownerName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "ownerID",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "buyerName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "buyerID",
				"type": "string"
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
				"name": "notaryID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ownerName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "ownerID",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "buyerName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "buyerID",
				"type": "string"
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
				"name": "notaryID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ownerName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "ownerID",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "buyerName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "buyerID",
				"type": "string"
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
				"name": "notaryID",
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
				"name": "notaryID",
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


		this.onChangeTransBuyer = this.onChangeTransBuyer.bind(this);
		this.onChangeTransSeller = this.onChangeTransSeller.bind(this);
		this.onChangeTransBuyerId = this.onChangeTransBuyerId.bind(this);
		this.onChangeTransSellerId = this.onChangeTransSellerId.bind(this);
		this.onChangePropertyId = this.onChangePropertyId.bind(this);
		this.onChangeTransDocs = this.onChangeTransDocs.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			trans_buyer_id: '',
			trans_buyer: '', 
			trans_seller_id: '',
			trans_seller: '',
			property_id: '',
			trans_docs: '',
			trans_notary_id: '',
			trans_completed: false,
			main_url: "/main/" + this.props.match.params.usr
		}
	}


	onChangeTransBuyer(e) {
		this.setState({
			trans_buyer: e.target.value
		});
	}

	onChangeTransBuyerId(e) {
		this.setState({
			trans_buyer_id: e.target.value
		});
	}

	onChangeTransSeller(e) {
		this.setState({
			trans_seller: e.target.value
		});
	}

	onChangeTransSellerId(e) {
		this.setState({
			trans_seller_id: e.target.value
		});
	}

	onChangePropertyId(e) {
		this.setState({
			property_id: e.target.value
		});
	}

	onChangeTransDocs(e) {
		this.setState({
			trans_docs: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const newTodo = {
			trans_buyer_id: this.state.trans_buyer_id,
			trans_buyer: this.state.trans_buyer, 
			trans_seller_id: this.state.trans_seller_id,
			trans_seller: this.state.trans_seller,
			property_id: this.state.property_id,
			trans_docs: this.state.trans_docs,
			trans_notary_id: this.props.match.params.usr,
			trans_completed: this.state.trans_completed,
		}

		axios.post('http://localhost:4000/todos/add', newTodo)
			.then(res => console.log(res.data));

		var Web3 = require('web3');
		// define using metamask
		// if (typeof window.ethereum !== 'undefined') {
		// 		// 	const provider = window['ethereum'];
		// 		// 	var web3 = new Web3(provider);
		// 		// } else {
		// 		// 	console.log("no metamask connected");
		// 		// }
		var userPublicKey = "0x853a8C14d3285120EA5379E923F3726DF89dC7A5";
		var userPrivateKey = "885515BB1C871C25F45170BC23233229BB240116F6FE12C2A6253CDBF9646EA0";
		var rpcUrl = "https://ropsten.infura.io/v3/204b3421ce854a73bf2ca420c5cae39f";
		var web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
		web3.eth.accounts.privateKeyToAccount(userPrivateKey); 
		// define contract
		var contract_address = '0xEAaEa353404d0cC1700cBF671f83903092a1B718';
		var contract = new web3.eth.Contract(abi, contract_address, {
			from: userPublicKey,
			gasPrice: '20000000000'
		});
		contract.defaultChain = 'ropsten';
		// call "addProperty" method in the contract and create a property named "123"
		contract.methods.addProperty(this.state.property_id, this.state.trans_seller_id, this.state.trans_seller).send({from:userPublicKey})
			.on('transactionHash', function(hash){
				console.log("transactionHash" + hash);
			})
			.on('receipt', function(receipt){
				console.log(receipt);
			});

		this.setState({
			trans_buyer_id: '',
			trans_buyer: '', 
			trans_seller_id: '',
			trans_seller: '',
			property_id: '',
			trans_docs: '',
			trans_notary_id: '',
			trans_completed: false,
			main_url: "/main/" + this.props.match.params.usr
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
						<label>buyer ID: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.trans_buyer_id} 
								onChange={this.onChangeTransBuyerId}
								/>
					</div>

					<div className="form-group">
						<label>buyer name: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.trans_buyer} 
								onChange={this.onChangeTransBuyer}
								/>
					</div>

					<div className="form-group">
						<label>owner ID: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.trans_seller_id} 
								onChange={this.onChangeTransSellerId}
								/>
					</div>

					<div className="form-group">
						<label>owner name: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.trans_seller} 
								onChange={this.onChangeTransSeller}
								/>
					</div>

					<div className="form-group">
						<label>Property ID: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.property_id} 
								onChange={this.onChangePropertyId}
								/>
					</div>

					<div className="form-group">
					<label>Property Docs: </label>
					<input  type="text" 
							className="form-control" 
							value={this.state.trans_docs} 
							onChange={this.onChangeTransDocs}
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