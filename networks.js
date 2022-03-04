module.exports = {
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8080,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },
  },
};
