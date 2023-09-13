// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IWrappedLemaoToken {
    function depositLemao(address _token, uint256 _amount) external;

    function withdrawLemao(uint256 _amount) external;
}
