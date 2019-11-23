pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;
contract colombia {
    
    event addPropertyEvent(
        address notaryID,
        string proposalID,
        string ownerID,
        string ownerName,
        string propertyID
    );
    
    event transferPropertyEvent(
        address notaryID,
        string ownerName,
        string ownerID,
        string buyerName,
        string buyerID,
        string proposalID,
        string propertyID
    );
    
    event approveEvent(
        address registrationOfficeID,
        address notaryID,
        string ownerName,
        string ownerID,
        string buyerName,
        string buyerID,
        string proposalID,
        string propertyID
    );
    
    event rejectEvent(
        address registrationOfficeID,
        address notaryID,
        string ownerName,
        string ownerID,
        string buyerName,
        string buyerID,
        string proposalID,
        string propertyID
    );
    
    event cancelEvent(
        address cancellerID,
        address notaryID,
        string proposalID,
        string propertyID
    );
    
    event timeoutEvent(
        address claimerID,
        address notaryID,
        string proposalID,
        string propertyID
    );
    
    event printProposalEvent(
        string  proposalID,
        address notaryID,
        string ownerID,
        string buyerID,
        string ownerName,
        string buyerName,
        string  propertyID,
        bool    isSuccess,
        bool    isAddTransaction,
        uint256 expiration,
        bool isPending
    );
    
    event printCheckingResultEvent(
        string result
    );
    
    uint256 duration = 720 hours;
    address public creator;
    
    struct Proposal{
        string  proposalID;
        address notaryID;
        string ownerID;
        string buyerID;
        string ownerName;
        string buyerName;
        string  propertyID;
        bool    isSuccess;
        bool    isAddTransaction;
        uint256 expiration;
        bool isPending;
        // office ID
    }
    
    mapping(bytes32 => string[]) ownership;
    address[] registrationOffices;
    mapping(string => Proposal) unfinishedProposals;
    // map from id to a list of proposal id
    mapping(string => string[]) userTransactions; 
    mapping(address => string[]) notaryTransactions; 
    string[] allProposalIDs;
    
    
    constructor() public {
        creator = msg.sender;
    }
    
    function getUserTransactions(string memory userID) public {
        string[] memory proposalIDs = userTransactions[userID];
        for (uint8 i = 0; i < proposalIDs.length; i++) {
            Proposal memory currProposal = unfinishedProposals[proposalIDs[i]];
            emit printProposalEvent(currProposal.proposalID, currProposal.notaryID, currProposal.ownerID, currProposal.buyerID, currProposal.ownerName, currProposal.buyerName, currProposal.propertyID, currProposal.isSuccess, currProposal.isAddTransaction, currProposal.expiration, currProposal.isPending);
        }
    }
    
    function getNotaryTransactions(address notaID) public {
        string[] memory proposalIDs = notaryTransactions[notaID];
        for (uint8 i = 0; i < proposalIDs.length; i++) {
            Proposal memory currProposal = unfinishedProposals[proposalIDs[i]];
            emit printProposalEvent(currProposal.proposalID, currProposal.notaryID, currProposal.ownerID, currProposal.buyerID, currProposal.ownerName, currProposal.buyerName, currProposal.propertyID, currProposal.isSuccess, currProposal.isAddTransaction, currProposal.expiration, currProposal.isPending);
        }
    }
    
    function getRegTransactions() public {
        for (uint8 i = 0; i < allProposalIDs.length; i++) {
            Proposal memory currProposal = unfinishedProposals[allProposalIDs[i]];
            emit printProposalEvent(currProposal.proposalID, currProposal.notaryID, currProposal.ownerID, currProposal.buyerID, currProposal.ownerName, currProposal.buyerName, currProposal.propertyID, currProposal.isSuccess, currProposal.isAddTransaction, currProposal.expiration, currProposal.isPending);
        }
    }
    
    function getOwnership(string memory ownerID) public returns (string[] memory) {
        return ownership[hashstr(((ownerID)))];
    }
    
    function addRegistrationOffice(address registrationOfficeID) public {
        require(msg.sender == creator);
        registrationOffices.push(registrationOfficeID);
    }
    
    function isRegistrationOffice(address ID) public returns (bool) {
        for(uint8 i=0; i < registrationOffices.length; i++)  {
            if (ID == registrationOffices[i])
            {
                emit printCheckingResultEvent("True");
                return true;
            }
        }
        emit printCheckingResultEvent("False");
        return false;
    }
    
    function hashstr (string memory str) private view returns (bytes32) {
        return keccak256(abi.encodePacked((str)));
    }
    
    function compareStrings (string memory a, string memory b) private view returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }
    
    function strConcat(string memory _a, string memory _b, string memory _c, string memory _d, string memory _e) internal returns (string memory){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (uint i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (uint i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (uint i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (uint i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }


    function strConcat(string memory _a, string memory _b) internal returns (string memory) {
        return strConcat(_a, _b, "", "", "");
    }
    
    function strConcat(string memory _a, string memory _b, string memory _c) internal returns (string memory) {
        return strConcat(_a, _b, _c, "", "");
    }
    
    function approve(string memory proposalID) public {
        require(isRegistrationOffice(msg.sender), "Only the Registration Office can call approve/reject");
        if (!unfinishedProposals[proposalID].isPending) {
            revert();
        }
        Proposal memory currProposal = unfinishedProposals[proposalID];
        if (currProposal.isAddTransaction) {
            ownership[hashstr(currProposal.ownerID)].push(currProposal.propertyID);
        } else {
            ownership[hashstr(currProposal.buyerID)].push(currProposal.propertyID);
            string[] memory str_arr = ownership[hashstr(currProposal.ownerID)];
            for (uint8 i = 0; i < str_arr.length; i++) {
                if (compareStrings(currProposal.propertyID, str_arr[i])) {
                     delete str_arr[i];
                }
            }
            ownership[hashstr(currProposal.ownerID)] = str_arr;
        }
        unfinishedProposals[proposalID].isPending = false;
        unfinishedProposals[proposalID].isSuccess = true;
        emit approveEvent(msg.sender, currProposal.notaryID, currProposal.ownerName, currProposal.ownerID,currProposal.buyerName, currProposal.buyerID, proposalID, currProposal.propertyID);
    }
    
    function reject(string memory proposalID) public {
        require(isRegistrationOffice(msg.sender), "Only the Registration Office can call approve/reject");
        unfinishedProposals[proposalID].isSuccess = false;
        unfinishedProposals[proposalID].isPending = false;
        Proposal memory currProposal = unfinishedProposals[proposalID];
        emit rejectEvent(msg.sender, currProposal.notaryID, currProposal.ownerName, currProposal.ownerID, currProposal.buyerName, currProposal.buyerID, proposalID, currProposal.propertyID);
    }
    
    function addProperty(string memory propertyID, string memory ownerID, string memory ownerName) public {
        string memory proposalID = strConcat(ownerID, propertyID);
        // check whether the user is trying to add a duplicate property
        if (unfinishedProposals[proposalID].isPending) {
            revert();
        }
        Proposal memory newProposal = Proposal(proposalID, msg.sender, ownerID, '', ownerName, '', propertyID, false, true, now + duration, true);
        unfinishedProposals[proposalID] = newProposal;
        userTransactions[ownerID].push(proposalID);
        notaryTransactions[msg.sender].push(proposalID);
        allProposalIDs.push(proposalID);
        emit addPropertyEvent(msg.sender, proposalID, ownerID, ownerName, propertyID);
    }
    
    function transferProperty(string memory propertyID, string memory ownerID, string memory buyerID, string memory ownerName, string memory buyerName) public {
        require(checkOwnership(ownerID, propertyID));
        string memory proposalID = strConcat(ownerID, buyerID, propertyID);
        // check whether the user is trying to sell a property again or sell an unapproved property
        if (unfinishedProposals[proposalID].isPending) {
            revert();
        }
        Proposal memory newProposal = Proposal(proposalID, msg.sender, ownerID, buyerID, ownerName, buyerName, propertyID, false, false, now + duration, true);
        unfinishedProposals[proposalID] = newProposal;
        userTransactions[ownerID].push(proposalID);
        userTransactions[buyerID].push(proposalID);
        notaryTransactions[msg.sender].push(proposalID);
        allProposalIDs.push(proposalID);
        emit transferPropertyEvent(msg.sender, ownerName, ownerID, buyerName, buyerID, proposalID, propertyID);
    }
    
    function checkOwnership(string memory ownerID, string memory propertyID) public returns (bool){
        for (uint8 i = 0; i < ownership[hashstr(ownerID)].length; i++) {
            if (compareStrings(propertyID, ownership[hashstr(ownerID)][i])) {
                 return true;
            }
        }
        return false;
    }
    

    // function claimTimeout(bytes32 proposalID) public {
    //     Proposal storage currProposal = unfinishedProposals[proposalID];
    //     require(msg.sender == currProposal.notaryID, "only notary of this transaction can be punished for timeout");
    //     require(now >= currProposal.expiration);
    //     unfinishedProposals[proposalID].isActive = false;
    //     emit timeoutEvent(msg.sender, currProposal.notaryID, proposalID, currProposal.propertyID);
    //     // add punishment
    // }
}