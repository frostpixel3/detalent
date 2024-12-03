// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SomeExample {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }
}
