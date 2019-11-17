pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;
contract colombia {
    
    event addPropertyEvent(
        address ownerID,
        bytes32 proposalID,
        string propertyID
    );
    
    event transferPropertyEvent(
        address ownerID,
        address buyerID,
        bytes32 proposalID,
        string propertyID
    );
    
    event approveEvent(
        address registrationOfficeID,
        address ownerID,
        address buyerID,
        bytes32 proposalID,
        string propertyID
    );
    
    event rejectEvent(
        address registrationOfficeID,
        address ownerID,
        address buyerID,
        bytes32 proposalID,
        string propertyID
    );
    
    event cancelEvent(
        address cancellerID,
        address ownerID,
        address buyerID,
        bytes32 proposalID,
        string propertyID
    );
    
    event timeoutEvent(
        address claimerID,
        address ownerID,
        address buyerID,
        bytes32 proposalID,
        string propertyID
    );
    
    uint256 duration = 720 hours;
    address public creator;
    
    struct Proposal{
        bytes32  proposalID;
        address ownerID;
        address buyerID;
        string  propertyID;
        bool    isActive;
        bool    isAddTransaction;
        uint256 expiration;
        // office ID
    }
    
    mapping(address => string[]) ownership;
    address[] registrationOffices;
    mapping(bytes32 => Proposal) unfinishedProposals;
    
    constructor() public {
        creator = msg.sender;
    }
    
    function getOwnership() public returns (string[] memory) {
        return ownership[msg.sender];
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
            ownership[currProposal.ownerID].push(currProposal.propertyID);
        } else {
            ownership[currProposal.buyerID].push(currProposal.propertyID);
            string[] memory str_arr = ownership[currProposal.ownerID];
            for (uint8 i = 0; i < str_arr.length; i++) {
                if (compareStrings(currProposal.propertyID, str_arr[i])) {
                     delete str_arr[i];
                }
            }
            ownership[currProposal.ownerID] = str_arr;
        }
        emit approveEvent(msg.sender, currProposal.ownerID, currProposal.buyerID, proposalID, currProposal.propertyID);
    }
    
    function reject(bytes32 proposalID) public {
        require(isRegistrationOffice(msg.sender), "Only the Registration Office can call approve/reject");
        unfinishedProposals[proposalID].isActive = false;
        Proposal memory currProposal = unfinishedProposals[proposalID];
        emit rejectEvent(msg.sender, currProposal.ownerID, currProposal.buyerID, proposalID, currProposal.propertyID);
    }
    
    function addProperty(string memory propertyID) public {
        bytes32 proposalID = sha256(abi.encodePacked(msg.sender, propertyID));
        // check whether the user is trying to add a duplicate property
        if (unfinishedProposals[proposalID].isActive) {
            revert();
        }
        Proposal memory newProposal = Proposal(proposalID, msg.sender, address(0), propertyID, true, true, now + duration);
        unfinishedProposals[proposalID] = newProposal;
        emit addPropertyEvent(msg.sender, proposalID, propertyID);
    }
    
    function transferProperty(address buyerID, string memory propertyID) public {
        require(checkOwnership(msg.sender, propertyID));
        bytes32 proposalID = sha256(abi.encodePacked(msg.sender, buyerID, propertyID));
        // check whether the user is trying to sell a property again or sell an unapproved property
        if (unfinishedProposals[proposalID].isActive) {
            revert();
        }
        Proposal memory newProposal = Proposal(proposalID, msg.sender, buyerID, propertyID, true, false, now + duration);
        unfinishedProposals[proposalID] = newProposal;
        emit transferPropertyEvent(msg.sender, buyerID, proposalID, propertyID);
    }
    
    function checkOwnership(address ownerID, string memory propertyID) public returns (bool){
        for (uint8 i = 0; i < ownership[ownerID].length; i++) {
            if (compareStrings(propertyID, ownership[ownerID][i])) {
                 return true;
            }
        }
        return false;
    }
    
    function cancel(bytes32 proposalID) public {
        Proposal storage currProposal = unfinishedProposals[proposalID];
        require(msg.sender == currProposal.buyerID || msg.sender == currProposal.ownerID, "only buyer or owner of this transaction can cancel");
        unfinishedProposals[proposalID].isActive = false;
        emit cancelEvent(msg.sender, currProposal.ownerID, currProposal.buyerID, proposalID, currProposal.propertyID);
    }
    
    function claimTimeout(bytes32 proposalID) public {
        Proposal storage currProposal = unfinishedProposals[proposalID];
        require(msg.sender == currProposal.buyerID || msg.sender == currProposal.ownerID, "only buyer or owner of this transaction can be punished for timeout");
        require(now >= currProposal.expiration);
        unfinishedProposals[proposalID].isActive = false;
        emit timeoutEvent(msg.sender, currProposal.ownerID, currProposal.buyerID, proposalID, currProposal.propertyID);
        // add punishment
    }
}