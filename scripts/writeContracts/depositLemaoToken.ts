import { ethers } from "hardhat";
import {
  LEMAOTOKEN_ADDRESS,
  WLEMAOTOKEN_ADDRESS,
  LEMAOTOKEN_OWNER,
  LEMAOTOKEN_HOLDER1,
} from "../addresses/address";

async function main() {
  // getting contract

  const lemaoTokenContract = await ethers.getContractAt(
    "LemaoToken",
    LEMAOTOKEN_ADDRESS
  );

  const wLemaoTokenContract = await ethers.getContractAt(
    "IWrappedLemaoToken",
    WLEMAOTOKEN_ADDRESS
  );

  const holder1Sig = await ethers.getImpersonatedSigner(LEMAOTOKEN_HOLDER1);

  // Balance of Holder before deposit
  const initialLemaoHolderBalance = await lemaoTokenContract.balanceOf(
    holder1Sig
  );
  const initialWLemaoHolderBalance = await wLemaoTokenContract.balanceOf(
    holder1Sig
  );
  const initialLemaoOwnerBalance = await lemaoTokenContract.balanceOf(
    LEMAOTOKEN_OWNER
  ); // the address the owners the contract
  console.log({
    initialLemaoHolderBalance: ethers.formatEther(initialLemaoHolderBalance),
    initialWLemaoHolderBalance: ethers.formatEther(initialWLemaoHolderBalance),
    initialLemaoOwnerBalance: ethers.formatEther(initialLemaoOwnerBalance),
  });

  console.log("==================================================\n");

  const depositAmount = ethers.parseEther("5000");
  const tokenAllowance = ethers.parseEther("1000000");

  // Approvals
  //   await lemaoTokenContract
  //     .connect(holder1Sig)
  //     .approve(wLemaoTokenContract, tokenAllowance);

  // check allowance
  const allowance = await lemaoTokenContract.allowance(
    holder1Sig,
    wLemaoTokenContract
  );
  console.log({
    allowance: ethers.formatEther(allowance),
  });

  console.log("==================================================\n");

  // Depositing lemao token and get wLemao token as receipt
  await wLemaoTokenContract.connect(holder1Sig).depositLemao(depositAmount);

  // Balance After depositing LemaoToken
  const afterLemaoHolderBalance = await lemaoTokenContract.balanceOf(
    holder1Sig
  );
  const afterWLemaoHolderBalance = await wLemaoTokenContract.balanceOf(
    holder1Sig
  );
  const afterLemaoOwnerBalance = await lemaoTokenContract.balanceOf(
    LEMAOTOKEN_OWNER
  );

  console.log({
    afterLemaoHolderBalance: ethers.formatEther(afterLemaoHolderBalance),
    afterWLemaoHolderBalance: ethers.formatEther(afterWLemaoHolderBalance),
    afterLemaoOwnerBalance: ethers.formatEther(afterLemaoOwnerBalance),
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
