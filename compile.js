const path = require("path");
const fs = require("fs");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "contract", "ChainWaveToken.sol");

const source = fs.readFileSync(contractPath, "utf-8");

let input = {
  language: "Solidity",
  sources: {
    "ChainWaveToken.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const tokenContract =
  output.contracts["ChainWaveToken.sol"]["ChainWaveExampleToken"];
const dirName = "bin";

const contractByteCodePath = path.join(dirName, "ChainWaveToken.bin");
fs.writeFileSync(contractByteCodePath, tokenContract.evm.bytecode.object);

const contractAbiPath = path.join(dirName, "ChainWaveToken.abi");
fs.writeFileSync(contractAbiPath, JSON.stringify(tokenContract.abi));
