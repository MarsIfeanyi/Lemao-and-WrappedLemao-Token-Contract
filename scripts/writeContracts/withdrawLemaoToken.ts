import { ethers } from "hardhat";
import {
  LEMAOTOKEN_ADDRESS,
  LEMAOTOKEN_OWNER,
  LEMAOTOKEN_HOLDER1,
  LEMAOTOKEN_HOLDER2,
  WLEMAOTOKEN_ADDRESS,
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

  // Checking Balance Before withdraw
  const initialWLemaoHolderBalance = await wLemaoTokenContract.balanceOf(
    holder1Sig
  );
  const initialLemaoHolderBalance = await lemaoTokenContract.balanceOf(
    holder1Sig
  );
  const initialLemaoOwnerBalance = await lemaoTokenContract.balanceOf(
    LEMAOTOKEN_OWNER
  );

  console.log({
    initialWLemaoHolderBalance: ethers.formatEther(initialWLemaoHolderBalance),
    initialLemaoHolderBalance: ethers.formatEther(initialLemaoHolderBalance),
    initialLemaoOwnerBalance: ethers.formatEther(initialLemaoOwnerBalance),
  });

  console.log("==================================================\n");

  // withdrawing
  const withdrawAmount = ethers.parseEther("5000");
  await wLemaoTokenContract.withdrawLemao(withdrawAmount);

  // Checking Balance After withdrawal
  const afterWLemaoHolderBalance = await wLemaoTokenContract.balanceOf(
    holder1Sig
  );
  const afterLemaoHolderBalance = await lemaoTokenContract.balanceOf(
    holder1Sig
  );
  const afterLemaoOwnerBalance = await lemaoTokenContract.balanceOf(
    LEMAOTOKEN_OWNER
  );
  console.log({
    afterWLemaoHolderBalance: ethers.formatEther(afterWLemaoHolderBalance),
    afterLemaoHolderBalance: ethers.formatEther(afterLemaoHolderBalance),
    afterLemaoOwnerBalance: ethers.formatEther(afterLemaoOwnerBalance),
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
