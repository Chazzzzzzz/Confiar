import React, {Component} from 'react';
import axios from 'axios';

import  {Link} from 'react-router-dom';

import logo from "../logo.svg";

import Web3 from 'web3'


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

export default class SignUp extends Component {

	constructor(props) {
		super(props);

		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeIsNotary = this.onChangeIsNotary.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePublicKey = this.onChangePublicKey.bind(this);
		this.onChangePrivateKey = this.onChangePrivateKey.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: '',
			password: '',
			is_notary: true,
			public_key: '',
			private_key: '',
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

	onChangeIsNotary(e) {
		let val = e.target.value
		let v = true
		if (val=="Registrar"){
			v = false
		}
		this.setState({
			is_notary: v
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			username: this.state.username,
			password: this.state.password,
			public_key: this.state.public_key,
			private_key: this.state.private_key,
			is_notary: this.state.is_notary,
		}

		axios.post('http://localhost:4000/todos/users/add', newUser)
			.then(res => console.log(res.data));

		var pub_key = this.state.public_key; 

		if (this.state.is_notary == false) {
			this.props.history.push('/main/registrar/' + this.state.username);

			var userPublicKey = "0x3F43716bCf007AE649414254eFC2b33D9e94Aeaf";
			var userPrivateKey = "0x0D3EF0CE996DB59C50A732A246F987E6E2B922723799101EF0A65A060BF2D54C";

			var Web3 = require('web3');

		
			var rpcUrl = "https://ropsten.infura.io/v3/204b3421ce854a73bf2ca420c5cae39f";
			var web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
			// define account
			var account = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
			web3.eth.accounts.wallet.add(account);
			// define contract
			var contract_address = '0xEAaEa353404d0cC1700cBF671f83903092a1B718';
			var contract = new web3.eth.Contract(abi, contract_address);
			contract.defaultChain = 'ropsten';
			contract.defaultHardfork = 'petersburg';

			async function addRegistrationOffice() {
				const from = web3.eth.accounts.wallet[0].address;
				const nonce = await web3.eth.getTransactionCount(from, "pending");
				let gas = await contract.methods
					.addRegistrationOffice(pub_key)
					.estimateGas({from: from, gas: "10000000000"});

				gas = Math.round(gas * 1.5);

				try {
					const result = await contract.methods
						.addRegistrationOffice(pub_key).send({gas, from, nonce})
						.on('transactionHash', function(hash){
							console.log("transactionHash" + hash);
						})
						.on('receipt', function(receipt){
							console.log(receipt);
						});
					console.log("success", result);
				} catch (e) {
					console.log("error", e);
				}
			}

			addRegistrationOffice();

		} else {
			this.props.history.push('/main/' + this.state.username);
		}

		

		this.setState({
			username: '',
			password: '',
			is_notary: true,
			public_key: '',
			private_key: '',
		});

	}

	onChangePublicKey(e) {
		this.setState({
			public_key: e.target.value
		});
	}

	onChangePrivateKey(e) {
		this.setState({
			private_key: e.target.value
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
						<label>Private Key: </label>
						<input  type="text" 
								className="form-control" 
								value={this.state.private_key} 
								onChange={this.onChangePrivateKey}
								/>
					</div>


					<div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Notary"
                                    checked={this.state.is_notary===true}
                                    onChange={this.onChangeIsNotary}
                                    />
                            <label className="form-check-label">Notary</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Registrar"
                                    checked={this.state.is_notary===false}
                                    onChange={this.onChangeIsNotary}
                                    />
                            <label className="form-check-label">Registrar</label>
                        </div>
                        
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