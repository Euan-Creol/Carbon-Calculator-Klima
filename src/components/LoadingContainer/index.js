
import React, { Component } from 'react'
import LogoGif from 'assets/images/Logo-FullSizeGif.gif'
import WrongNetworkImage from 'assets/images/error-wrong_network.jpg'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Picture } from 'react-responsive-picture'
import { styles } from './styles.scss'

class LoadingContainer extends Component {
  render() {
    const { drizzle } = this.props
    if (drizzle.web3.status === 'failed') {
      return (
        <div className={styles}>
          <main className="loading-screen">
            <div className="pure-g">
              <div className="pure-u-1-1">
                <p>
                  This browser has no connection to the Ethereum network. Please
                  use the Chrome/FireFox extension MetaMask, or dedicated Ethereum
                  browsers Mist or Parity.
                </p>
              </div>
            </div>
          </main>
        </div>

      )
    }
    if (drizzle.contractList.length === 0) {
      return (
        <div className={styles}>
          <Grid
            container
            className="loading-screen"
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Picture
                sources={[{ srcSet: WrongNetworkImage }]}
                alt="Creol-Logo-Gif"
              />
            </Grid>
          </Grid>
        </div>
      )
    }


    return (
      <div className={styles}>
        <Grid
          container
          className="loading-screen"
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={3}
          >
            <Picture
              sources={[{ srcSet: LogoGif }]}
              alt="Creol-Logo-Gif"
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

LoadingContainer.propTypes = {
  drizzle: PropTypes.shape({
    web3: PropTypes.shape({ status: PropTypes.bool }).isRequired,
    contractList: PropTypes.array
  }
  ).isRequired
}

export default LoadingContainer
