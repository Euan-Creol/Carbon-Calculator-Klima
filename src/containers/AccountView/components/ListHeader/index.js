import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import {  Paper }               from '@material-ui/core'
import Grid                     from '@material-ui/core/Grid'
import ComplexGrid              from '../AccountGrid'
import { styles }               from './styles.scss'

class ListHeader extends Component {
  render() {
    const { address, balance } = this.props
    return (
      <div className={styles}>
        <Paper>
          <Grid container spacing={8} justify="space-evenly">
            <Grid item xs={12} sm container direction="row">
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <span className="address">Address: {address}</span>
                  <div className="balance">Balance: {balance}</div>
                </Grid>
              </Grid>
            </Grid>
            <ComplexGrid />
            <ComplexGrid />
            <ComplexGrid />
            <ComplexGrid />

          </Grid>
        </Paper>

      </div>

    )
  }
}
ListHeader.propTypes = {
  address: PropTypes.string,
  balance: PropTypes.number
}
ListHeader.defaultProps = {
  address: '0x0000000000000000',
  balance: 0
}

export default ListHeader
