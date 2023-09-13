import { ethers, network } from "hardhat";
const { verify } = require("../../utils/verify");

async function main() {
  const lemaoTokenContract = await ethers.deployContract("LemaoToken");
  await lemaoTokenContract.waitForDeployment();

  console.log("============DEPLOYING LEMAOTOKEN CONTRACT=============");

  console.log(`
        "LemaoToken Contract Deployed to:" ${lemaoTokenContract.target}
    `);

  if (
    network.config.chainId === 11155111 ||
    (5 && process.env.ETHERSCAN_API_KEY)
  ) {
    console.log("Waiting for block confirmations...");

    //wait for 10 block confirmations before verifying the transaction
    // @ts-ignore
    await lemaoTokenContract.waitForDeployment(10);
    await verify(lemaoTokenContract.target, []);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
