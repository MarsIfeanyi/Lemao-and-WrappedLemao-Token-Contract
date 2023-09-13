// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LemaoToken is ERC20 {
    address immutable i_owner;

    constructor() ERC20("Lemao Token", "LMA") {
        _mint(msg.sender, 5000000e18);
        i_owner = msg.sender;
    }

    function transferLemao(address _to, uint256 _amount) external {
        _calcualteFee(_to, _amount);
    }

    function _calcualteFee(address _to, uint256 _amount) internal {
        require(_amount > 0, "Zero Amount");
        require(_to != address(0), "Not a Valid Address");

        // fee = 8% of amount
        uint256 fee = (8 * _amount) / 100;

        uint256 remainingAmount = _amount - fee;

        // transfer fee to the owner of the contract address
        bool successFee = transfer(i_owner, fee);
        require(successFee, "Fee: Transfer Failed");

        // transfer the remaining amount to the receiver address
        bool success = transfer(_to, remainingAmount);
        require(success, "RemainingAmount: Transfer Failed");
    }
}
