// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract SupplierMint is ERC721URIStorage {
    uint256 public tokenCounter;
    event NFTMinted(
        address indexed owner,
        uint256 indexed tokenId,
        string tokenURI
    );
    constructor() ERC721("SupplierInvoice", "SI") {
        tokenCounter = 0;
    }

    function MintNFT(string memory tokenURI) public returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter += 1;
        emit NFTMinted(msg.sender, newItemId, tokenURI);
        return newItemId;
    }
}
