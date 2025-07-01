// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// view & pure functions

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
error DIDCertificate_Root_Already_Submitted();
error DIDCertificate_only_Issuer_allowed();

contract DIDCertificate {
    struct cert {
        string did;
        string course;
        uint256 timestamp;
    }

    mapping(address => cert[]) public issueCerts;
    mapping(bytes32 => string) public merkleRoots;
    address public issuer;

    event issuedCertificate(
        address indexed user,
        string did,
        string courseName
    );
    event MerkleRootSubmitted(bytes32 indexed root, string batchName);

    modifier onlyIssuer() {
        if (msg.sender != issuer) {
            revert DIDCertificate_only_Issuer_allowed();
        }
        _;
    }
    constructor() {
        issuer = msg.sender;
    }

    function issueCertificate(
        address user,
        string memory did,
        string memory courseName
    ) external onlyIssuer {
        issueCerts[user].push(cert(did, courseName, block.timestamp));
        emit issuedCertificate(user, did, courseName);
    }
    // function submitMerkleRoot (bytes32 root, string memory batchName)
    function submitMerkleRoot(
        bytes32 root,
        string memory batchName
    ) public onlyIssuer {
        if (bytes(merkleRoots[root]).length > 0) {
            revert DIDCertificate_Root_Already_Submitted();
        }
        merkleRoots[root] = batchName;
        emit MerkleRootSubmitted(root, batchName);
    }

    function verifyMerkleProof(
        bytes32 leaf,
        bytes32[] calldata proof,
        bytes32 root
    ) public pure returns (bool) {
        bytes32 hash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];
            if (hash <= proofElement) {
                hash = keccak256(abi.encodePacked(hash, proofElement));
            } else {
                hash = keccak256(abi.encodePacked(proofElement, hash));
            }
        }

        return hash == root;
    }

    function getCertificates(address user) public view returns (cert[] memory) {
        return issueCerts[user];
    }

    // verifyMerkleProof (bytes32 leafHash, bytes32[] calldata proof, bytes32 root) → bool
}
