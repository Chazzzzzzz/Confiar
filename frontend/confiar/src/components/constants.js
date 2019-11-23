export function getAbi() {
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
					"type": "string"
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
			"inputs": [],
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
					"type": "string"
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
					"type": "string"
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
					"type": "string"
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
					"type": "string"
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
					"type": "string"
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
					"type": "string"
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
					"type": "string"
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
					"type": "string"
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
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "result",
					"type": "string"
				}
			],
			"name": "printCheckingResultEvent",
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
return abi;
};



export function contractAddress() {
	var adr = '0xcF37C04C0d06b17CaDf4192226E1Bd980067b0f2';
return adr;
};

