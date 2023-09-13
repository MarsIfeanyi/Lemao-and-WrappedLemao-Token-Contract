import { ethers } from "hardhat";

async function main() {
  const lemaoTokenContract = await ethers.deployContract("LemaoToken");
  const txReceipt = lemaoTokenContract.waitForDeployment();

  console.log(`
        "LemaoToken Contract Deployed to:" ${lemaoTokenContract.target}
    `);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
