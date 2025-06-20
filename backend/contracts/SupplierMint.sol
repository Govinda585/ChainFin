// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @title Supplier Invoice NFT Minting
/// @notice This contract allows minting NFTs representing supplier invoices
/// @dev Inherits ERC721URIStorage for full token URI support
contract SupplierMint is ERC721URIStorage {
    /// @notice Counter for tracking the next token ID
    uint256 public tokenCounter;

    /// @notice Emitted when a new NFT is minted
    /// @param owner Address of the NFT recipient
    /// @param tokenId ID of the minted token
    /// @param tokenURI Metadata URI of the NFT
    event NFTMinted(
        address indexed owner,
        uint256 indexed tokenId,
        string tokenURI
    );

    /// @notice Initializes the NFT contract with name and symbol
    constructor() ERC721("SupplierInvoice", "SI") {
        tokenCounter = 0;
    }

    /// @notice Mints a new NFT to the sender's address
    /// @param tokenURI URI containing metadata of the NFT (e.g., IPFS link)
    /// @return tokenId ID of the newly minted token
    function mintNFT(
        string memory tokenURI
    ) external returns (uint256 tokenId) {
        require(bytes(tokenURI).length > 0, "Token URI cannot be empty");

        tokenId = tokenCounter;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        tokenCounter += 1;

        emit NFTMinted(msg.sender, tokenId, tokenURI);
    }
}
