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
				"name": "notaID",
				"type": "address"
			}
		],
		"name": "getNotaryTransactions",
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
				"name": "regID",
				"type": "address"
			}
		],
		"name": "getRegTransactions",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "userID",
				"type": "string"
			}
		],
		"name": "getUserTransactions",
		"outputs": [],
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "proposalID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "notaryID",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ownerID",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "buyerID",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "ownerName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "buyerName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "propertyID",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "isSuccess",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "isAddTransaction",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "expiration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "isPending",
				"type": "bool"
			}
		],
		"name": "printProposalEvent",
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

export default class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			res : [],
		}
	}

	componentDidMount() {
		function setVal(r){
			this.setState({
				res: r,
			});
		}

		var userPublicKey = "0x3F43716bCf007AE649414254eFC2b33D9e94Aeaf";
		var userPrivateKey = "0x0D3EF0CE996DB59C50A732A246F987E6E2B922723799101EF0A65A060BF2D54C";

		var Web3 = require('web3');


		var rpcUrl = "https://ropsten.infura.io/v3/204b3421ce854a73bf2ca420c5cae39f";
		var web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
		// define account
		var account = web3.eth.accounts.privateKeyToAccount(userPrivateKey);
		web3.eth.accounts.wallet.add(account);
		// define contract
		var contract_address = '0xCA964A199AE5C16F25cD56F2E54080188FD54adB';
		var contract = new web3.eth.Contract(abi, contract_address);
		contract.defaultChain = 'ropsten';
		contract.defaultHardfork = 'petersburg';

		async function getTransactions() {
			const from = web3.eth.accounts.wallet[0].address;
			const nonce = await web3.eth.getTransactionCount(from, "pending");
			let gas = await contract.methods
				.getUserTransactions("123")
				.estimateGas({from: from});

			gas = Math.round(gas * 1.5);

			try {
				const result = await contract.methods
					.getUserTransactions("123").send({gas, from, nonce})
					.on('transactionHash', function(hash){
						console.log("transactionHash" + hash);
					});
				console.log("success", result);
				setVal(result);

			} catch (e) {
				console.log("error", e);
			}
		}

		getTransactions();


	}

	

	render () {
		return (
			<div>
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
			        <a className="navbar-brand" href="https://www.google.com/" target="_blank">
			          <img src={logo} width="40" height ="40" alt="CodingTheSmartWay.com" />
			        </a>

			        <Link to="/" className="navbar-brand">Notary App</Link>

			         <div className="collpase nav-collapse">
			              <ul className="navbar-nav mr-auto">
			                <li className="navbar-item">
			                  <Link to="/" className="nav-link">Login Page</Link>
			                </li>
			              </ul>
			          </div>

			      </nav>
			</div>


			<div style={{marginTop: 20}}>
				<h3> Search Transactions for ID:</h3>
				<form onSubmit={this.onSubmit}>
					<div>
					<p>{(this.state.res.length == 0) ? "loading" : this.state.res}</p>
					</div>

				</form>
			</div>
			</div>
			)
	}
}
