import React     from 'react'
import PropTypes                from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import AppBarInverse from 'components/AppBarInverse'
import { styles } from './styles.scss'
import StripeCheckoutButton from '../StripeCheckoutButton'


const subscriptions = [
  {
    name: 'Eco Burner',
    offsetText: 'You will offset your carbon footprint on a 1:1 basis, this means you will offset ' +
      'carbon as you consume it.',
    rewardText: 'Your reward earning rate regenerative actions through Creol integrations will also ' +
      'be matched at 1:1.',
    monthlyPrice: 10
  },
  {
    name: 'Eco Warrior',
    offsetText: 'You will offset your carbon footprint on a 1:10 basis, this means you will offset ' +
      'ten times as much carbon as you consume.',
    rewardText: 'Your reward earning rate regenerative actions through Creol integrations will also ' +
      'be matched at 1:10.',
    monthlyPrice: 20
  },
  {
    name: 'Eco Saviour',
    offsetText: 'You will offset your carbon footprint on a 1:30 basis, this means you will offset ' +
      'thirty times as much carbon as you consume.',
    rewardText: 'Your reward earning rate regenerative actions through Creol integrations will also ' +
      'be matched at 1:30.',
    monthlyPrice: 30
  }
]

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function TabPanels(props) {
  const {
    item, value, index, stripe, address
  } = props
  return (
    <TabPanel value={value} index={index}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
        <Grid xs item>
          <h2>{item.name}</h2>
        </Grid>
        <Grid xs item>
          <p>{item.offsetText}</p>
          <p>{item.rewardText}</p>
        </Grid>
        <Grid xs item >
          <h2>Price: £{item.monthlyPrice} / Month</h2>
          <p>Billed Annually</p>
        </Grid>
        <Grid xs item >
          <StripeCheckoutButton buttonText="Subscribe" address={address} stripe={stripe} />
        </Grid>
      </Grid>
    </TabPanel>)
}

TabPanels.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    offsetText: PropTypes.string.isRequired,
    rewardText: PropTypes.string.isRequired,
    monthlyPrice: PropTypes.string.isRequired
  }).isRequired,
  value: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  stripe: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}))

export default function SubscriptionPanel(props) {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const { stripe, address } = props

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className={styles}>
      <div className="subscription-view">
        <Grid container direction="column" justify="center" alignContent="center" spacing={3}>
          <Grid item xs >
            <AppBarInverse>
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                {subscriptions.map((item, index) => {
                  // eslint-disable-next-line react/no-array-index-key
                  return <Tab item={item} key={index} label={item.name} />
                })}
              </Tabs>
            </AppBarInverse>
            {subscriptions.map((item, index) => {
              return (<TabPanels
                value={value}
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                item={item}
                index={index}
                label={item.name}
                address={address}
                stripe={stripe}
              />)
            })}
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
SubscriptionPanel.propTypes = {
  stripe: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
}
