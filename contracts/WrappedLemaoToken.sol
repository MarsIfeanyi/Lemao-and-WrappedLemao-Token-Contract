// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WrappedLemaoToken is ERC20 {
    address immutable i_owner;

    IERC20 LemaoToken;

    constructor(address _lemaoToken) ERC20("WrappedLemao Token", "WLMA") {
        _mint(msg.sender, 5000000e18);

        i_owner = msg.sender;

        LemaoToken = IERC20(_lemaoToken);
    }

    function depositLemao(uint256 _amount) external {
        bool success = LemaoToken.transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        require(success, "DepositLemao: Transfer Failed");
        uint256 _amountToMint = (92 * _amount) / 100;

        _mint(msg.sender, _amountToMint);
    }

    function withdrawLemao(uint256 _amount) external {
        require(balanceOf(msg.sender) >= _amount, "Insufficient Balance");

        _burn(msg.sender, _amount);
        LemaoToken.transfer(msg.sender, _amount);
    }
}
