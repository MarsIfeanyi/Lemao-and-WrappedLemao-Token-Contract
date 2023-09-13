import { ethers, network } from "hardhat";
const { verify } = require("../../utils/verify");

async function main() {
  const wLemaoTokenContract = await ethers.deployContract("WrappedLemaoToken");
  await wLemaoTokenContract.waitForDeployment();

  console.log("============DEPLOYING WRAPPEDLEMAOTOKEN CONTRACT=============");

  console.log(`
        "Wrapped Lemao Token Contract Deployed to:" ${wLemaoTokenContract.target}
    `);

  if (
    network.config.chainId === 11155111 ||
    (5 && process.env.ETHERSCAN_API_KEY)
  ) {
    console.log("Waiting for block confirmations...");

    //wait for 10 block confirmations before verifying the transaction
    // @ts-ignore
    await wLemaoTokenContract.waitForDeployment(10);
    await verify(wLemaoTokenContract.target, []);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
