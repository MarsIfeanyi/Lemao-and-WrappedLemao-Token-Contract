# Bulding Lemao and WrappedLemao Tokens

## Description

[Lemao](https://sepolia.etherscan.io/address/0x8c61875107911Df94FC3D1F8BB69FCEDf825B5D8#code) contract is an ERC20 Token that charges 8% fee on transfers ie it charges the user 8% fee anytime they want to transfer Lemao token (LMA) to another user.

- On calling the transfer() 8% fee is charged and paid to the owner address.
  [WrappedLemao](https://sepolia.etherscan.io/address/0xD06BfF77CcDd12B4edffd86a46BF30237ea8bfDa#code) Receipt contract that wraps the Lemao token. It accepts only Lemao tokens
  It has two main functions:
- depositLemao()
- withdrawLemao()

depositLemao() allows users to easily deposit Lemao tokens.
When a user deposits Lemao token in the WLemao contract, it mints a receipt token of the same amount of WLemao token to the user.
Users can easily transfer WrappedLemao tokens(WLMA) without paying fees (Zero fees on transfer).

withdrawLemao() allows users to easily convert WrappedLemao token back to Lemao token.
For users to get their Lemao tokens back, they deposit their WrappedLemao tokens back to the WrappedLemao contract by calling the withdrawLemao(), This burns the receipt token and transfers back the Lemao token to the user.

### LemaoToken Contract Address

https://sepolia.etherscan.io/address/0x8c61875107911Df94FC3D1F8BB69FCEDf825B5D8#code

### WrappedLemaoToken Contract Address

https://sepolia.etherscan.io/address/0xD06BfF77CcDd12B4edffd86a46BF30237ea8bfDa#code
