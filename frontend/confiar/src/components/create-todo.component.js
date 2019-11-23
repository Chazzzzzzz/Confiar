import React, {Component} from 'react';
import axios from 'axios';
import Web3 from 'web3'

import { Dropdown, DropdownButton, FormControl,  ul} from 'react-bootstrap';

import  {Link} from 'react-router-dom';

import logo from "../logo.svg.png";

import {getAbi} from "./constants.js"
import {contractAddress} from "./constants.js"

var abi = getAbi();

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
			info: [],
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

	componentDidMount(){
		axios.get('http://localhost:4000/todos/getInfo/'+this.props.match.params.usr)
			.then(response => {
				this.setState({info: response.data});
			})
			.catch(function(error) {
				console.log(error);
			})
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



		// var userPublicKey = "0x3F43716bCf007AE649414254eFC2b33D9e94Aeaf";
		// var userPrivateKey = "0x0D3EF0CE996DB59C50A732A246F987E6E2B922723799101EF0A65A060BF2D54C";

		var userPublicKey = this.state.info[0]['public_key']
		var userPrivateKey = "0x" + this.state.info[0]['private_key']

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
		// call "addProperty" method in the contract and create a property named "123"
// <<<<<<< HEAD
// 		contract.methods.addProperty(this.state.property_id, this.state.trans_seller_id, this.state.trans_seller).send({from:userPublicKey})
// 			.on('transactionHash', function(hash){
// 				console.log("transactionHash" + hash);
// 			})
// 			.on('receipt', function(receipt){
// 				console.log(receipt);
// 			});
		var prop1 = this.state.property_id;
		var prop2 =this.state.trans_seller_id;
		var prop3 = this.state.trans_seller;
		var prop4 = this.state.trans_buyer_id;
		var prop5 = this.state.trans_buyer;

		async function addProperty() {
			const from = web3.eth.accounts.wallet[0].address;
			const nonce = await web3.eth.getTransactionCount(from, "pending");
			let gas = await contract.methods
				.addProperty(prop1, prop2, prop3)
				.estimateGas({from: from, gas: "5000000000000"});

			gas = Math.round(gas * 1.5);

			try {
				const result = await contract.methods
					.addProperty(prop1, prop2, prop3).send({gas, from, nonce})
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

		async function transferProperty() {
			const from = web3.eth.accounts.wallet[0].address;
			const nonce = await web3.eth.getTransactionCount(from, "pending");
			let gas = await contract.methods
				.transferProperty(prop1, prop2, prop4, prop3, prop5)
				.estimateGas({from: from, gas: "5000000000000"});

			gas = Math.round(gas * 1.5);

			try {
				const result = await contract.methods
					.transferProperty(prop1, prop2, prop4, prop3, prop5).send({gas, from, nonce})
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

		// addProperty();
		transferProperty();

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
			} catch (e) {
				console.log("error", e);
			}
		}

		// getTransactions();



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
			        <a className="navbar-brand" href={this.props.main_url} target="_blank">
			          <img src={logo} width="150" height ="30"  />
			        </a>

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
