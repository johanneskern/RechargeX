// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Rechargex is Initializable, Ownable {
    uint256 public minAmount;

    // Nerif Network workflow listens for Recharge event in order to start the workflow
    // that does some magic to get the given amount on the specified phone number
    event Recharge(uint256 amount, bytes number);
    event Withdrawal(uint256 amount, uint256 timestamp);

    function initialize(uint256 _minAmount) external initializer {
        minAmount = _minAmount;
    }

    function recharge(uint256 amount, bytes calldata number) external payable {
        require(amount >= minAmount, "Amount is too small");
        require(msg.value == amount, "Specified amount must be equal to the given one");

        emit Recharge(msg.value, number);
    }

    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "Nothing to withdraw");

        emit Withdrawal(address(this).balance, block.timestamp);

        payable(owner()).transfer(address(this).balance);
    }
}
