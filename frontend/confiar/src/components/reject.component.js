import React, {Component} from 'react';
import axios from 'axios';
import Web3 from 'web3';

import {getAbi} from "./constants.js"
import {contractAddress} from "./constants.js"

var abi = getAbi();

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
        var userPublicKey = this.state.info[0]['public_key'];
        var userPrivateKey = "0x" + this.state.info[0]['private_key'];

        console.log("Reg Public Key:" + userPublicKey);
        console.log("Reg Private Key:" + userPrivateKey);

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
        // call "addProperty" method in the contract and create a property named "123"
        var prop1 = this.props.match.params.id;
        var cur = this;
        var usr = this.props.match.params.usr;
        console.log("properID:" + prop1);
        async function reject() {
            const from = userPublicKey;
            const nonce = await web3.eth.getTransactionCount(from, "pending");
            let gas = await contract.methods
                .reject(prop1)
                .estimateGas({from: from});

            gas = Math.round(gas * 1.5);

            try {
                const result = await contract.methods
                    .reject(prop1).send({gas, from, nonce})
                    .on('transactionHash', function(hash){
                        console.log("transactionHash" + hash);
                    })
                    .on('receipt', function(receipt){
                        console.log(receipt);
                    });
                cur.props.history.push('/main/registrar/' + usr);
            } catch (e) {
                console.log("error", e);
            }
        }

        reject();
    }
    onSubmitTwo(e) {
        e.preventDefault();
        this.props.history.push('/main/registrar/' + this.props.match.params.usr);
    }
    render() {
        return (
            <div>
                <h2>Are you sure you want to Reject Transaction {this.props.match.id}?</h2>
                <form onSubmit={this.onSubmitOne}>
                    <button type="submit" className="btn btn-outline-danger">Reject</button>
                    &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-outline-secondary" onClick={this.onSubmitTwo}>Back</button>
                </form>
            </div>
        )
    }
}