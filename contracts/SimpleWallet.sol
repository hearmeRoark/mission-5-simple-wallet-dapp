// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleWallet {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Anyone can deposit ETH
    function deposit() external payable {}

    // Only owner can withdraw ETH
    function withdraw(uint256 amount) external {
        require(msg.sender == owner, "Only owner");
        require(address(this).balance >= amount, "Insufficient balance");

        (bool success, ) = payable(owner).call{value: amount}("");
        require(success, "ETH transfer failed");
    }

    // Get contract ETH balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}