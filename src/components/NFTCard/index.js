import React        from 'react'
import ReddPeruProject from 'assets/images/NFTCards/Forestry-REDD-Peru.jpg'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TelegramIcon from '@material-ui/icons/Telegram'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Button, Grid, Tooltip } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom'
import staticProjectData from '../../data/NFTData/NFTInfo.json'

import { styles } from './styles.scss'


const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}))


function getProjectStaticData(projectID) {
  return staticProjectData.projects[projectID]
}

function getProjectImage(projectID) {
  switch (projectID) {
  case '868':
    return ReddPeruProject
  default:
    return ReddPeruProject
  }
}

export default function NFTCard(props) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  // const {history, location, match} = useReactRouter()
  const {
    tokenCount,
    projectID,
    scopeNumber, homeView, networkID
  } = props
  let subHeaderText = ''
  let actionButtons
  let etherscanlink
  if (!homeView) {
    subHeaderText = `${tokenCount.toString()} Credits`
    actionButtons = (
      <div>
        <Tooltip title="Coming Soon" placement="top" TransitionComponent={Zoom}>
          <IconButton aria-label="transfer">
            <TelegramIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Coming Soon" placement="top" TransitionComponent={Zoom}>
          <IconButton aria-label="top up">
            <ShoppingCartIcon color="primary" />
          </IconButton>
        </Tooltip>
      </div>)
  }
  if (networkID === 1) {
    etherscanlink = 'https://etherscan.io/token/0x0aba09a87ab6ba2b4e0db3e01a71e7d55c2f6c49'
  } else if (networkID === 4) {
    etherscanlink = 'https://rinkeby.etherscan.io/token/0x0F86b9a56636039aAF7A40574cfBD3Ed1EF1cC31'
  }
  const projectStaticData = getProjectStaticData(projectID)
  const projectImage = getProjectImage(projectID)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <div className={styles}>
      <Card className="root">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className="avatar">
              {scopeNumber}
            </Avatar>
          }

          title={projectStaticData.title}
          subheader={subHeaderText}
        />
        <CardMedia
          className="media"
          image={projectImage}
          title={projectStaticData.imgAlt}
        />
        <CardContent>
          <Typography variant="body2" color="primary" component="p">
            {projectStaticData.summaryText}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {actionButtons}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography ><span className="spans">How & Who</span> </Typography>
            <Typography variant="body2" align="left" gutterBottom>
              {projectStaticData.expandedText}
            </Typography>
            <Grid container direction="row" justify="center" alignItems="center">
              <Grid item xs={6} className="nft-btn">
                <Button variant="contained" color="secondary" href={etherscanlink}>Etherscan</Button>
              </Grid>
              <Grid item xs={6} className="nft-btn">
                <Button variant="contained" color="primary" href={projectStaticData.vcsLink}>View On VCS</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </div>)
}
NFTCard.propTypes = {
  tokenCount: PropTypes.number.isRequired,
  projectID: PropTypes.number.isRequired,
  scopeNumber: PropTypes.shape({}).isRequired,
  homeView: PropTypes.bool,
  networkID: PropTypes.number.isRequired
}
NFTCard.defaultProps = {
  homeView: false
}
