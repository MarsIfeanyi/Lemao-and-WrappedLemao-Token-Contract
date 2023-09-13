import { ethers } from "hardhat";

async function main() {
  const wLemaoTokenContract = await ethers.deployContract("WrappedLemaoToken");
  const txReceipt = wLemaoTokenContract.waitForDeployment();

  console.log(`
        "Wrapped Lemao Token Contract Deployed to:" ${wLemaoTokenContract.target}
    `);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
