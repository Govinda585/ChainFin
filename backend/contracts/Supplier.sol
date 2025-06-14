// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Supplier {
    struct Invoice {
        string invoiceTitle;
        string desc;
        uint amount;
        string ipfsPDFHash;
    }

    Invoice[] public invoices;

    event InvoiceCreated(
        uint index,
        string invoiceTitle,
        address indexed sender
    );

    function setInvoice(
        string memory _invoiceTitle,
        string memory _desc,
        uint _amount,
        string memory _ipfsPDFHash
    ) public {
        invoices.push(Invoice(_invoiceTitle, _desc, _amount, _ipfsPDFHash));
        uint index = invoices.length - 1;
        emit InvoiceCreated(index, _invoiceTitle, msg.sender);
    }

    function getInvoiceCount() public view returns (uint256) {
        return invoices.length;
    }
}
