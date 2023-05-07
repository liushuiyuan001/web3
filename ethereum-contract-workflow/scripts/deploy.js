const path = require('path')
const { Web3 } = require('web3');

const HDWalletProvider = require("@truffle/hdwallet-provider");

//1. 拿到 bytecode
const contractPath = path.resolve(__dirname, '../compiled/Car.sol.json')
const { abi, evm } = require(contractPath).Car
const bytecode = evm.bytecode.object

//2. 配置 provider
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: 'chief catalog bleak rigid nest town awkward major barrel stairs lobster police'
  },
  providerOrUrl: 'https://eth-goerli.g.alchemy.com/v2/Kmr39z1LwpqDkgqPlOIYcmZ9n2iqonvJ'
})

//3. 初始化 web3 实例
const web3 = new Web3(provider)

const deploy = async () => {
  // 4. 获取钱包里面的账号
  const accounts = await web3.eth.getAccounts()
  console.log('部署合约账户：', accounts[0])
  // 5. 创建合约实例并且部署
  console.time('contract-deploy');
  let result = null
  try {
    result = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: ['BWM']
    })
    .send({
      from: accounts[0],
      gas: 6680,
      // gasPrice: "1000000000",
    })
  } catch (error) {
    console.log('error', error)
  }

  console.timeEnd('contract-deploy');

  console.log('合约部署成功', result?.options?.address)
}

deploy()