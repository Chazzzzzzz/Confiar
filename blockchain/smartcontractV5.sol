pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;
contract colombia {
    
    event addPropertyEvent(
        address notaryID,
        bytes32 proposalID,
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
        bytes32 proposalID,
        string propertyID
    );
    
    event approveEvent(
        address registrationOfficeID,
        address notaryID,
        string ownerName,
        string ownerID,
        string buyerName,
        string buyerID,
        bytes32 proposalID,
        string propertyID
    );
    
    event rejectEvent(
        address registrationOfficeID,
        address notaryID,
        string ownerName,
        string ownerID,
        string buyerName,
        string buyerID,
        bytes32 proposalID,
        string propertyID
    );
    
    event cancelEvent(
        address cancellerID,
        address notaryID,
        bytes32 proposalID,
        string propertyID
    );
    
    event timeoutEvent(
        address claimerID,
        address notaryID,
        bytes32 proposalID,
        string propertyID
    );
    
    uint256 duration = 720 hours;
    address public creator;
    
    struct Proposal{
        bytes32  proposalID;
        address notaryID;
        string ownerID;
        string buyerID;
        string ownerName;
        string buyerName;
        string  propertyID;
        bool    isActive;
        bool    isAddTransaction;
        uint256 expiration;
        // office ID
    }
    
    mapping(bytes32 => string[]) ownership;
    address[] registrationOffices;
    mapping(bytes32 => Proposal) unfinishedProposals;
    
    constructor() public {
        creator = msg.sender;
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
                return true;
            }
        }
        return false;
    }
    
    function hashstr (string memory str) private view returns (bytes32) {
        return keccak256(abi.encodePacked((str)));
        
    }
    
    function compareStrings (string memory a, string memory b) private view returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
        
    }
    
    function approve(bytes32 proposalID) public {
        require(isRegistrationOffice(msg.sender), "Only the Registration Office can call approve/reject");
        if (!unfinishedProposals[proposalID].isActive) {
            revert();
        }
        Proposal memory currProposal = unfinishedProposals[proposalID];
        currProposal.isActive = false;
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
        emit approveEvent(msg.sender, currProposal.notaryID, currProposal.ownerName, currProposal.ownerID,currProposal.buyerName, currProposal.buyerID, proposalID, currProposal.propertyID);
    }
    
    function reject(bytes32 proposalID) public {
        require(isRegistrationOffice(msg.sender), "Only the Registration Office can call approve/reject");
        unfinishedProposals[proposalID].isActive = false;
        Proposal memory currProposal = unfinishedProposals[proposalID];
        emit rejectEvent(msg.sender, currProposal.notaryID, currProposal.ownerName, currProposal.ownerID, currProposal.buyerName, currProposal.buyerID, proposalID, currProposal.propertyID);
    }
    
    function addProperty(string memory propertyID, string memory ownerID, string memory ownerName) public {
        bytes32 proposalID = sha256(abi.encodePacked(msg.sender, propertyID));
        // check whether the user is trying to add a duplicate property
        if (unfinishedProposals[proposalID].isActive) {
            revert();
        }
        Proposal memory newProposal = Proposal(proposalID, msg.sender, ownerID, '', ownerName, '', propertyID, true, true, now + duration);
        unfinishedProposals[proposalID] = newProposal;
        emit addPropertyEvent(msg.sender, proposalID, ownerID, ownerName, propertyID);
    }
    
    function transferProperty(string memory propertyID, string memory ownerID, string memory buyerID, string memory ownerName, string memory buyerName) public {
        require(checkOwnership(ownerID, propertyID));
        bytes32 proposalID = sha256(abi.encodePacked(msg.sender, buyerID, propertyID));
        // check whether the user is trying to sell a property again or sell an unapproved property
        if (unfinishedProposals[proposalID].isActive) {
            revert();
        }
        Proposal memory newProposal = Proposal(proposalID, msg.sender, ownerID, buyerID, ownerName, buyerName, propertyID, true, false, now + duration);
        unfinishedProposals[proposalID] = newProposal;
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