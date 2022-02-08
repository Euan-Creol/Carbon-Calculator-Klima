import React from 'react'
import PropTypes       from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'

import { styles } from './styles.scss'

const useStyles = makeStyles(theme => ({
  root: {
    width: 'inherit'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}))

export default function ExpansionPanelComponent(props) {
  const classes = useStyles()
  const { expansionHeading, expansionContent, expansionIcon } = props

  return (
    <div className={classes.root}>
      <div className={styles}>
        <ExpansionPanel className="panel" elevation={0}>
          <ExpansionPanelSummary
            expandIcon={expansionIcon}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="panel-summary"
          >
            <Typography className="expansion-heading">{expansionHeading}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="panel-details">
            {expansionContent}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  )
}
ExpansionPanelComponent.propTypes = {
  expansionHeading: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  expansionContent: PropTypes.any.isRequired,
  expansionIcon: PropTypes.shape({}).isRequired
}
