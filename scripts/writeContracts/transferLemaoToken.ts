import { ethers } from "hardhat";
import {
  LEMAOTOKEN_ADDRESS,
  LEMAOTOKEN_OWNER,
  LEMAOTOKEN_HOLDER1,
  LEMAOTOKEN_HOLDER2,
} from "../addresses/address";

async function main() {
  const lemaoTokenContract = await ethers.getContractAt(
    "ILemaoToken",
    LEMAOTOKEN_ADDRESS
  );

  const ownerSig = await ethers.getImpersonatedSigner(LEMAOTOKEN_OWNER);
  // checking Balance of owner and LEMAOTOKEN_HOLDER
  const ownerInitialBalance = await lemaoTokenContract.balanceOf(ownerSig);
  const holder1InitialBalance = await lemaoTokenContract.balanceOf(
    LEMAOTOKEN_HOLDER1
  );

  console.log({
    OwnerInitialBalance: ethers.formatEther(ownerInitialBalance),
    Holder1InitialBalance: ethers.formatEther(holder1InitialBalance),
  });

  console.log(
    "========= Transferring From LemaoToken Owner to Holder1 ===================\n"
  );

  const amount = ethers.parseEther("1000000");

  await lemaoTokenContract
    .connect(ownerSig)
    .transfer(LEMAOTOKEN_HOLDER1, amount);

  // Balance token transfer from owner to receiver

  const ownerAfterBalance = await lemaoTokenContract.balanceOf(ownerSig);
  const holder1AfterBalance = await lemaoTokenContract.balanceOf(
    LEMAOTOKEN_HOLDER1
  );

  console.log({
    ownerAfterBalance: ethers.formatEther(ownerAfterBalance),
    holder1AfterBalance: ethers.formatEther(holder1AfterBalance),
  });

  console.log(
    "============= Transferring From Holder1 to Holder2 =======================\n"
  );

  // Balance before transferring Lemao Token from Holder1 to Holder2
  const initalBalanceHolder1 = await lemaoTokenContract.balanceOf(
    LEMAOTOKEN_HOLDER1
  );
  const initalBalanceHolder2 = await lemaoTokenContract.balanceOf(
    LEMAOTOKEN_HOLDER2
  );
  console.log({
    initalBalanceHolder1: ethers.formatEther(initalBalanceHolder1),
    initalBalanceHolder2: ethers.formatEther(initalBalanceHolder2),
  });

  console.log(
    "===============================================================\n"
  );

  const holder1Sig = await ethers.getImpersonatedSigner(LEMAOTOKEN_HOLDER1);

  const sendingAmount = ethers.parseEther("5000");

  await lemaoTokenContract
    .connect(holder1Sig)
    .transfer(LEMAOTOKEN_HOLDER2, sendingAmount);

  // After Balance of Holder1 and Holder2 after transferring

  const afterBalanceHolder1 = await lemaoTokenContract.balanceOf(
    LEMAOTOKEN_HOLDER1
  );
  const afterBalanceHolder2 = await lemaoTokenContract.balanceOf(
    LEMAOTOKEN_HOLDER2
  );
  console.log({
    afterBalanceHolder1: ethers.formatEther(afterBalanceHolder1),
    afterBalanceHolder2: ethers.formatEther(afterBalanceHolder2),
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
