// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

/// @title Supplier Invoice Management
/// @notice Allows users to store and retrieve invoices with IPFS hash references
contract Supplier {
    /// @notice Represents a single invoice
    struct Invoice {
        string title;
        string description;
        uint256 amount;
        string ipfsHash;
    }

    /// @dev Array to store all invoices
    Invoice[] private invoices;

    /// @notice Emitted when a new invoice is created
    /// @param index Index of the created invoice
    /// @param title Title of the invoice
    /// @param sender Address that submitted the invoice
    event InvoiceCreated(
        uint256 indexed index,
        string title,
        address indexed sender
    );

    /// @notice Creates and stores a new invoice
    /// @param _title The title of the invoice
    /// @param _description A description of the invoice
    /// @param _amount The monetary amount of the invoice
    /// @param _ipfsHash The IPFS hash of the invoice PDF
    function createInvoice(
        string memory _title,
        string memory _description,
        uint256 _amount,
        string memory _ipfsHash
    ) external {
        require(bytes(_title).length > 0, "Invoice title is required");
        require(bytes(_description).length > 0, "Description is required");
        require(_amount > 0, "Amount must be greater than zero");
        require(bytes(_ipfsHash).length > 0, "IPFS hash is required");
        invoices.push(
            Invoice({
                title: _title,
                description: _description,
                amount: _amount,
                ipfsHash: _ipfsHash
            })
        );

        emit InvoiceCreated(invoices.length - 1, _title, msg.sender);
    }

    /// @notice Returns the total number of invoices stored
    /// @return The invoice count
    function getInvoiceCount() external view returns (uint256) {
        return invoices.length;
    }

    /// @notice Returns the details of a specific invoice
    /// @param index The index of the invoice to retrieve
    /// @return title Invoice title
    /// @return description Invoice description
    /// @return amount Invoice amount
    /// @return ipfsHash IPFS hash of the invoice PDF
    function getInvoice(
        uint256 index
    )
        external
        view
        returns (
            string memory title,
            string memory description,
            uint256 amount,
            string memory ipfsHash
        )
    {
        require(index < invoices.length, "Invalid invoice index");
        Invoice storage invoice = invoices[index];
        return (
            invoice.title,
            invoice.description,
            invoice.amount,
            invoice.ipfsHash
        );
    }
}
