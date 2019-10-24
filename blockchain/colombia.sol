pragma solidity >=0.4.22 <0.6.0;
contract colombia {
    
    uint256 duration = 30;
    
    struct Proposal{
        string  proposalID;
        address ownerID;
        address buyerID;
        string  propertyID;
        bool    isActive;
        bool    isAddTransaction;
        uint256 expiration;
        // office ID
    }
    
    mapping(address => string[]) ownership;
    address[] registertionOffice;
    mapping(string => Proposal) unfinishedProposals;
    
    constructor() public {
        creator = msg.sender;
    }
    
    function addRegisterationOffice(address registerationOfficeID) public {
        require(msg.sender = creator);
        registertionOffice.push(registerationOfficeID);
    }
    
    function isRegistertionOffice(address ID) private return (bool){
        for(uint8 i=0; i < registerationOfficeID.length; i++) {
            if (ID == registerationOfficeID[i]) {
                return true
            }
        }
        return false
    }
    
    function approve(string proposalID) public {
        require(isRegistertionOffice(msg.sender), "Only the Registeration Office can call approve/reject");
        Proposal currProposal = unfinishedProposals[proposalID];
        currProposal.isActive = false;
        if (currProposal.isAddTransaction) {
            ownership[currProposal.ownerID] = currProposal.propertyID;
        } else {
            ownership[currProposal.buyerID].push(currProposal.propertyID);
            ownership[currProposal.ownerID].delete(currProposal.propertyID);
            
        }
    }
    
    function reject(string proposalID) public {
        require(isRegistertionOffice(msg.sender), "Only the Registeration Office can call approve/reject");
        unfinishedProposals[proposalID].isActive = false;
    }
    
    function addProperty(address userID, string propertyID) public {
        string proposalID = sha256(userID, proposalID);
        // check whether the user is trying to add a duplicate property
        if (unfinishedProposals[proposalID].isActive) {
            revert();
        }
        
        Proposal newProposal = Proposal(proposalID, userID, "", proposalID, true, true, now + duration days);
        unfinishedProposals[proposalID] = newProposal;
    }
    
    function transferProperty(address ownerID, address buyerID, string propertyID) public {
        string proposalID = sha256(userID, proposalID);
        // check whether the user is trying to sell a property again or sell an unapproved property
        if (unfinishedProposals[proposalID].isActive) {
            revert();
        }
        
        Proposal newProposal = Proposal(proposalID, userID, buyerID, proposalID, true, false, now + duration days);
        unfinishedProposals[proposalID] = newProposal;
    }
    
    function cancel(address userID, string propertyID) public {
        Proposal currProposal = unfinishedProposals[proposalID];
        require(userID == currProposal.buyerID || userID == currProposal.ownerID, "only buyer or owner of this transaction can cancel");
        unfinishedProposals[proposalID].isActive = false;
    }
    
    function claimTimeout(string propertyID) private {
        Proposal currProposal = unfinishedProposals[proposalID];
        require(userID == currProposal.buyerID || userID == currProposal.ownerID, "only buyer or owner of this transaction can cancel");
        require(now >= currProposal.expiration);
        unfinishedProposals[proposalID].isActive = false;
        // add punishment
    }
}
