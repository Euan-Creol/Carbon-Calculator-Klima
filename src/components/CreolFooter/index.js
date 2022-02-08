import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { Picture } from 'react-responsive-picture'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import CreolCarbonStreamLogo from 'assets/images/Creol_Carbon_Stream_white@3x.png'
import { styles }              from './styles.scss'

class CreolFooter extends Component {
  render() {
    return (
      <div className={styles}>
        <Grid container direction="column" spacing={3} className="footer">
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <Typography gutterBottom variant="body2" align="left">
                  <span className="footer-span">Info</span>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom variant="body2" align="left">
                  <span className="footer-span">Contact</span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row" className="link-box">
              <Grid item xs={6}>
                <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                  <Grid item xs={12}>
                    <Link href="/#/faq" className="footer-links">FAQ</Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href="https://www.creol.io/tandcuse" className="footer-links">Terms of Use</Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href="https://www.creol.io/tandcsale" className="footer-links">Terms of Sale</Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href="https://www.creol.io/privacy-policy" className="footer-links">Privacy Policy</Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href="https://www.creol.io" className="footer-links">About Us</Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link href="/#/roadmap" className="footer-links">Roadmap</Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'left' }}>
                <Link href="mailto:info@creol.io?Subject=Creol%20Carbon%20Stream%Contact" className="footer-links">Email Us</Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={6} className="footer-logo-item">
                <Link href="/" className="footer-links">
                  <Picture
                    sources={[{ srcSet: CreolCarbonStreamLogo }]}
                    alt="Creol-Logo"
                    className="footer-logo"
                  />
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="row" justify="center">
                  <Grid item xs={2} className="twitter-icon">
                    <IconButton href="https://twitter.com/CreolControl">
                      <TwitterIcon className="social-icons" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={2} className="instagram-icon">
                    <IconButton href="https://www.instagram.com/creationtocontrol/">
                      <InstagramIcon className="social-icons" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={8} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="copyright-row">
            <Grid container direction="row">
              <Grid item xs={6}>
                <Typography gutterBottom variant="body2" align="left" className="footer-links">
                  2020 Creol Ltd
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default CreolFooter
