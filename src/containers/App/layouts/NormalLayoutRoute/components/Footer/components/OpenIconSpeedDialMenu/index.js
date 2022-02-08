import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import HomeIcon from '@material-ui/icons/Home'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import EcoIcon from '@material-ui/icons/Eco'
import { Trophy } from 'mdi-material-ui'
import { Tooltip } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inherit'
  },
  speedDial: {
    margin: 'auto',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(1),
      top: theme.spacing(1)
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2)
    },
    '&.MuiSpeedDial-root': {

    }
  }
}))

const actions = [
  { icon: <HomeIcon />, name: 'Home' },
  { icon: <AccountCircleIcon />, name: 'Account' },
  { icon: <Tooltip title="Coming Soon" placement="top" TransitionComponent={Zoom}><Trophy /></Tooltip>, name: 'Journey' },
  { icon: <Tooltip title="Coming Soon" placement="top" TransitionComponent={Zoom}><ShoppingCartIcon /></Tooltip>, name: 'Top Up' },
  { icon: <EcoIcon />, name: 'Carbon' }
]


export default function SpeedDials(props) {
  const classes = useStyles()
  const [direction, setDirection] = React.useState('left')
  const [open, setOpen] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)

  // eslint-disable-next-line no-unused-vars
  const handleDirectionChange = (event) => {
    setDirection(event.target.value)
  }

  // eslint-disable-next-line no-unused-vars
  const handleHiddenChange = (event) => {
    setHidden(event.target.checked)
  }

  const handleClose = (name) => {
    const { history } = props

    setOpen(false)

    switch (name) {
    case 'Home':
      history.push('/home')
      break
    case 'Account':
      history.push('/account')
      break
    case 'Carbon':
      history.push('/carbon')
      break
    case 'Journey':
      history.push('/coming-soon')
      break
    case 'Top Up':
      history.push('/coming-soon')
      break
    default:
      break
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={direction}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClose(action.name, props)}
          />
        ))}
      </SpeedDial>
    </div>
  )
}
SpeedDials.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
}
