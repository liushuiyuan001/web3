const fs = require('fs-extra')
const path = require('path')
const solc = require('solc')

const contractPath = path.resolve(__dirname, '../contracts', 'Car.sol')
const contractSource = fs.readFileSync(contractPath, 'utf-8')

const input = {
  language: 'Solidity',
  sources: {
    'Car.sol': {
      content: contractSource
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const result = JSON.parse(solc.compile(JSON.stringify(input)))

if(Array.isArray(result.errors) && result.errors.length && result.errors[0]?.type !== 'Warning') {
  throw new Error(JSON.stringify(result.errors[0]))
}

const compiledDir = path.resolve(__dirname, '../compiled')
fs.removeSync(compiledDir)
fs.ensureDirSync(compiledDir)

Object.keys(result.contracts).forEach(name => {
  const contractName = name.replace(/^:/, '');
  const filePath = path.resolve(compiledDir, `${contractName}.json`);
  fs.outputJsonSync(filePath, result.contracts[name]);
  console.log(`save compiled contract ${contractName} to ${filePath}`);
});
