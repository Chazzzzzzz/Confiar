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
    
    function compareStrings (string memory a, string memory b) private view returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
        
    }
    
    function approve(string memory proposalID) public {
        require(isRegistrationOffice(msg.sender), "Only the Registration Office can call approve/reject");
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
           
            
        }
    }
    
    function reject(string memory proposalID) public {
        require(isRegistrationOffice(msg.sender), "Only the Registration Office can call approve/reject");
        unfinishedProposals[proposalID].isActive = false;
    }
    
    function addProperty(address userID, string memory propertyID) public {
         string memory proposalID = bytes256ToString(sha256(abi.encodePacked(userID, propertyID)));
        // check whether the user is trying to add a duplicate property
        if (unfinishedProposals[proposalID].isActive) {
            revert();
        }
        
        Proposal memory newProposal = Proposal(proposalID, userID, address(0), proposalID, true, true, now + duration);
        unfinishedProposals[proposalID] = newProposal;
    }
    
    function transferProperty(address ownerID, address buyerID, string memory propertyID) public {
        string memory proposalID = bytes256ToString(sha256(abi.encodePacked(ownerID, buyerID, propertyID)));
        // check whether the user is trying to sell a property again or sell an unapproved property
        if (unfinishedProposals[proposalID].isActive) {
            revert();
        }
        
        Proposal memory newProposal = Proposal(proposalID, ownerID, buyerID, proposalID, true, false, now + duration);
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
    function bytes256ToString(bytes32 x) private pure returns (string memory) {
        bytes memory bytesString = new bytes(256);
        uint charCount = 0;
        for (uint j = 0; j < 256; j++) {
            byte char = x[j];
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (uint j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }
}
