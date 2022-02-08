import * as React from 'react'
import PropTypes from 'prop-types'
import { LinearProgress, Typography, Box } from '@material-ui/core'
import { Component } from 'react'

class LinearWithValueLabel extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { value } = this.props
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: 1 }}>
          <LinearProgress style={{ color: '#cccccc' }} variant="determinate" value={value} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            value
          )}%`}
          </Typography>
        </Box>
      </Box>
    )
  }
}

LinearWithValueLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired
}

export default (LinearWithValueLabel)
