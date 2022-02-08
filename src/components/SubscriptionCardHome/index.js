import React           from 'react'
import PropTypes       from 'prop-types'
import Card            from '@material-ui/core/Card'
import CardHeader      from '@material-ui/core/CardHeader'
import CardMedia       from '@material-ui/core/CardMedia'
import CardContent     from '@material-ui/core/CardContent'
import Typography      from '@material-ui/core/Typography'
import { Grid }        from '@material-ui/core'
import { Picture }     from 'react-responsive-picture'
import EcoBurnerImg    from 'assets/images/AccountView/Eco_Purple_Burner@3x.png'
import EcoWarriorImg   from 'assets/images/AccountView/Warrior@3x.png'
import EcoSaviourImg   from 'assets/images/AccountView/Saviour@3x.png'
import TreeIcon        from 'assets/images/HomeView/Tree_Icon@3x.png'
import CarIcon         from 'assets/images/HomeView/Car_Icon@3x.png'
import { styles }      from './styles.scss'

function getSubscriptionImage(subscriptionName) {
  switch (subscriptionName) {
  case 'Eco Burner':
    return EcoBurnerImg
  case 'Eco Warrior':
    return EcoWarriorImg
  case 'Eco Saviour':
    return EcoSaviourImg
  default:
    return EcoBurnerImg
  }
}
export default function SubscriptionCardHome(props) {
  const {
    subscription
  } = props
  const fetchImage = getSubscriptionImage(subscription.name)
  return (
    <div className={styles}>
      <Card className="root">
        <CardHeader
          title={subscription.name}
          className="sub-header"
        />
        <CardMedia
          className="media"
          image={fetchImage}
          title={subscription.imageAlt}
        />
        <CardContent>
          <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
            <Grid item xs={12} className="main-sub-text">
              <Typography variant="body2" align="left" gutterBottom className="sub-text">
                {subscription.subscriptionText}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center" gutterBottom>
                <span className="spans">{subscription.subscriptionSubText}</span>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} className="card-span-items">
                  <span className="spans">{subscription.subPrice} / Week</span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center" gutterBottom>
                This is the equivalent annual green benefit of
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={6}>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item xs={12}>
                      <Typography variant="body2" align="center" gutterBottom>
                        <span className="spans">Planting</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Picture
                        sources={[{
                          srcSet: TreeIcon
                        }]}
                        alt="Trees"
                        className="equivalent-images"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" align="center" gutterBottom>
                        {subscription.treesEquivalent} Trees a year
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item xs={12}>
                      <Typography variant="body2" align="center" gutterBottom>
                        <span className="spans">Reducing</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Picture
                        sources={[{
                          srcSet: CarIcon
                        }]}
                        alt="Cars"
                        className="equivalent-images"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" align="center" gutterBottom>
                        {subscription.carMilesEquivalent} car miles
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>

  )
}
SubscriptionCardHome.propTypes = {
  subscription: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    subscriptionText: PropTypes.string.isRequired,
    subscriptionSubText: PropTypes.string.isRequired,
    carMilesEquivalent: PropTypes.string.isRequired,
    treesEquivalent: PropTypes.string.isRequired,
    subPrice: PropTypes.string.isRequired
  }).isRequired
}
