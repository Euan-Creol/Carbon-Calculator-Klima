import React      from 'react'
import PropTypes  from 'prop-types'
import Grid       from '@material-ui/core/Grid'
import Avatar     from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'

import { styles } from './styles.scss'

function addressFormatter(address) {
  return `${address.slice(0, 6)}...${address.slice(-6)}`
}

export default function AccountGrid(props) {
  const { address, headerText } = props
  const reducedAddr = addressFormatter(address)
  return (
    <div className={styles}>
      <Grid container spacing={0} direction="column" justify="center" alignContent="center" alignItems="center">
        <Grid item xs={12} className="top-bar">
          <Grid container spacing={0} direction="column" justify="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom color="inherit">
                {reducedAddr}&#39;s
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom color="inherit">
                {headerText}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="bottom-bar" />
        <ButtonBase className="image">
          <div className="border">
            <Avatar className="avatar"><PersonIcon color="primary" className="account-icon" /></Avatar>
          </div>
        </ButtonBase>
      </Grid>
    </div>
  )
}
AccountGrid.propTypes = {
  address: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired
}
