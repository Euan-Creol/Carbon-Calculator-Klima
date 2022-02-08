
const drizzleOptions = {
  web3: {
    block: false,
    customProvider: null,
    fallback: {
      type: 'ws',
      url: 'wss://rinkeby.infura.io/ws/v3/d1170d8dd0ba484b9776ed4aec0f8d3a'
    }
  },
  contracts: [
  ],
  syncAlways: false,
  events: {
  },
  polls: {
    accounts: 60000, /* 1.5 seconds polling for account changes in MetaMask */
    blocks: 60000
  }
}

export default drizzleOptions
