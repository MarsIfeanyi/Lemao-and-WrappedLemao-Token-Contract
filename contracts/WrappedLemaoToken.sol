// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {LemaoToken} from "./LemaoToken.sol";

contract WrappedLemaoToken is ERC20 {
    address immutable i_owner;

    mapping(address => LemaoToken) addressToLemaoToken;

    constructor() ERC20("WrappedLemao Token", "WLMA") {
        _mint(msg.sender, 5000000e18);
        i_owner = msg.sender;
    }

    function depositLemao(address _token, uint256 _amount) external {
        bool success = addressToLemaoToken[_token].transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        require(success, "DepositLemao: Transfer Failed");

        _mint(msg.sender, _amount);
    }

    function withdrawLemao(uint256 _amount) external {
        _burn(msg.sender, _amount);
    }
}
