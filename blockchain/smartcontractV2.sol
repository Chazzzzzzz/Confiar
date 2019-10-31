pragma solidity >=0.4.22 <0.6.0;
contract colombia {
    
    uint256 duration = 720 hours;
    address public creator;
    
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
    address[] registrationOffices;
    mapping(string => Proposal) unfinishedProposals;
    
    constructor() public {
        creator = msg.sender;
    }
    
    function addRegistrationOffice(address registrationOfficeID) public {
        require(msg.sender == creator);
        registrationOffices.push(registrationOfficeID);
    }
    
    function isRegistrationOffice(address ID) private returns (bool) {
        for(uint8 i=0; i < registrationOffices.length; i++)  {
            if (ID == registrationOffices[i])
            {
                return true;
            }
        }
        return false;
    }
    
    function approve(string memory proposalID) public {
        require(isRegistrationOffice(msg.sender), "Only the Registration Office can call approve/reject");
        Proposal storage currProposal = unfinishedProposals[proposalID];
        currProposal.isActive = false;
        if (currProposal.isAddTransaction) {
            ownership[currProposal.ownerID] = currProposal.propertyID;
        } else {
            ownership[currProposal.buyerID].push(currProposal.propertyID);
            delete ownership[currProposal.ownerID][currProposal.propertyID];
            
        }
    }
    
    function reject(string memory proposalID) public {
        require(isRegistrationOffice(msg.sender), "Only the Registration Office can call approve/reject");
        unfinishedProposals[proposalID].isActive = false;
    }
    
    function addProperty(address userID, string memory propertyID) public {
        string memory proposalID = sha256(userID, propertyID);
        // check whether the user is trying to add a duplicate property
        if (unfinishedProposals[proposalID].isActive) {
            revert();
        }
        
        Proposal storage newProposal = Proposal(proposalID, userID, "", proposalID, true, true, now + duration);
        unfinishedProposals[proposalID] = newProposal;
    }
    
    function transferProperty(address ownerID, address buyerID, string memory propertyID) public {
        string memory proposalID = sha256(ownerID, buyerID, propertyID);
        // check whether the user is trying to sell a property again or sell an unapproved property
        if (unfinishedProposals[proposalID].isActive) {
            revert();
        }
        
        Proposal storage newProposal = Proposal(proposalID, ownerID, buyerID, proposalID, true, false, now + duration);
        unfinishedProposals[proposalID] = newProposal;
    }
    
    function cancel(address userID, string memory proposalID) public {
        Proposal storage currProposal = unfinishedProposals[proposalID];
        require(userID == currProposal.buyerID || userID == currProposal.ownerID, "only buyer or owner of this transaction can cancel");
        unfinishedProposals[proposalID].isActive = false;
    }
    
    function claimTimeout(address userID, string memory proposalID) private {
        Proposal storage currProposal = unfinishedProposals[proposalID];
        require(userID == currProposal.buyerID || userID == currProposal.ownerID, "only buyer or owner of this transaction can be punished for timeout");
        require(now >= currProposal.expiration);
        unfinishedProposals[proposalID].isActive = false;
        // add punishment
    }
}
