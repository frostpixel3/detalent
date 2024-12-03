// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SomeExample.sol";

contract SomeExampleFactory {
    address[] public deployedContracts;

    event ContractDeployed(address indexed newContractAddress);

    function deployContract() public {
        address newContract = address(new SomeExample());
        deployedContracts.push(newContract);
        emit ContractDeployed(newContract);
    }

    function getDeployedContracts() public view returns (address[] memory) {
        return deployedContracts;
    }
}
