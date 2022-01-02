const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = '';

module.exports = {
  networks: {
    harmony: {
      provider: () => {
        if (!privateKey.trim()) {
          throw new Error(
            'Please enter a private key with funds, you can use the default one'
          );
        }
        return new HDWalletProvider({
          privateKeys: [privateKey],
          providerOrUrl: 'https://api.s0.b.hmny.io',
        });
      },
      network_id: 1666700000,
    },
  },
  compilers: {
    solc: {
      version: '0.8.10',
      settings: {
        optimizer: {
            enabled: false,
            runs: 200,
        }
    }
    },
  },
};
