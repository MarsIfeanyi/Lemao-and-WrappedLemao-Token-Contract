// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LemaoToken is ERC20 {
    address immutable i_owner;

    constructor() ERC20("Lemao Token", "LMA") {
        _mint(msg.sender, 5000000e18);
        i_owner = msg.sender;
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        // calculates 8% as transfer fee
        uint256 fee = (8 * amount) / 100;
        // getting the remainingAmount after removing the transfer feee
        uint256 remainingAmount = amount - fee;

        super._transfer(from, to, remainingAmount);
        super._transfer(from, i_owner, fee);
    }
}
