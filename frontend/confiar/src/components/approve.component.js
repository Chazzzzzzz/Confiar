import React, {Component} from 'react';
import axios from 'axios';
import Web3 from 'web3';

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

export default class DeleteTodo extends Component {
	constructor(props) {
		super(props);
		this.onSubmitOne = this.onSubmitOne.bind(this);
		this.onSubmitTwo = this.onSubmitTwo.bind(this);
		this.state = {
			info: [],
		}
	}

	componentDidMount(){
		axios.get('http://localhost:4000/todos/getInfo/'+this.props.match.params.usr)
			.then(response => {
				this.setState({info: response.data});
			})
			.catch(function(error) {
				console.log(error);
			})
	}

	onSubmitOne(e) {
		e.preventDefault();



		var userPublicKey = this.state.info[0]['public_key']
		var userPrivateKey = "0x" + this.state.info[0]['private_key']

		alert(userPublicKey);

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
		// call "addProperty" method in the contract and create a property named "123"
		var prop1 = this.props.match.params.id;
		alert(prop1);
		
	
		async function approve() {
			const from = web3.eth.accounts.wallet[0].address;
			const nonce = await web3.eth.getTransactionCount(from, "pending");
			let gas = await contract.methods
				.approve(prop1)
				.estimateGas({from: from, gas: "5000000000000"});

			gas = Math.round(gas * 1.5);

			try {
				const result = await contract.methods
					.approve(prop1).send({gas, from, nonce})
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

		approve();

		

		this.props.history.push('/main/registrar/' + this.props.match.params.usr);
	}
	onSubmitTwo(e) {
		e.preventDefault();
		this.props.history.push('/main/registrar/' + this.props.match.params.usr);
	}
	render() {
		return (
		<div>
		<h2>Are you sure you want to Approve Transaction {this.props.match.id}?</h2>
		<form onSubmit={this.onSubmitOne}>
      <button type="submit" class="btn btn-outline-danger">Approve</button>
       &nbsp;&nbsp;&nbsp;
      <button class="btn btn-outline-secondary" onClick={this.onSubmitTwo}>Back</button>
    </form>
		</div>
	)
	}
}