import Portis from '@portis/web3'
import Fortmatic from 'fortmatic'
import Torus from '@toruslabs/torus-embed'
import GoogleLogo from 'assets/images/Web3View/GoogleAccount.png'

const providerOptions = {
  portis: {
    package: Portis,
    display: {
      name: 'Email',
      description: 'Login using an Email'
    },
    options: {
      id: 'e9e4607a-7015-46eb-8100-6ecfdcdff365' // Live Mainnet Key
    }
  },
  fortmatic: {
    package: Fortmatic, // required
    display: {
      name: 'Phone/Email',
      description: 'Login using a Phone or Email'
    },
    options: {
      key: 'pk_live_AAB9EA8E63A8D835' // required
    }
  },
  torus: {
    package: Torus, // required
    display: {
      logo: GoogleLogo,
      name: 'Gmail/Social',
      description: 'Login using your Gmail/Social account'
    },
    options: {
      enableLogging: false, // optional
      buttonPosition: 'bottom-left', // optional
      buildEnv: 'production', // optional
      showTorusButton: true, // optional
      enabledVerifiers: {
        // optional
        google: true // optional
      }
    }
  }
}

export default providerOptions
