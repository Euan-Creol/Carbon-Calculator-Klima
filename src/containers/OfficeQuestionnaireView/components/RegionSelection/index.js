import React, { Component }                             from 'react'
import { Grid,
  FormControl,
  MenuItem,
  Select,
  Card,
  CardActionArea }                                       from '@material-ui/core'
import PropTypes                                        from 'prop-types'
import ArrowDownwardIcon                                from '@mui/icons-material/ArrowDownward'

import UKFlag                                           from '../../../../assets/images/QuestionnaireView/Flag_of_the_United_Kingdom.svg'
import EUFlag                                           from '../../../../assets/images/QuestionnaireView/Flag_of_Europe.svg'
import USFlag                                           from '../../../../assets/images/QuestionnaireView/Flag_of_the_United_States.svg'
import WorldFlag                                        from '../../../../assets/images/QuestionnaireView/Flag_of_World.svg'
import { styles }                                       from './styles.scss'

/*
The component that allows for the user to select their region
 */
class RegionSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      RegionID: 2,
      RegionName: 'US'
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.RegionID !== this.props.RegionID) {
      this.SetRegion(this.props.RegionID, this.props)
    }
  }

  SetRegion(NewValue, props) {
    /*
    @notice A function to set the state for the current region
    @param NewValue: A number corresponding to a region
    @param props: required to pass the state to the parent component
     */
    let newRegionName = 'US'
    switch (NewValue) {
    case 0:
      newRegionName = 'UK'
      break
    case 1:
      newRegionName = 'EU'
      break
    case 2:
      newRegionName = 'US'
      break
    case 3:
      newRegionName = 'World'
      break
    default:
      newRegionName = 'US'
    }
    this.setState({
      RegionID: NewValue,
      RegionName: newRegionName
    }, () => { this.handleRegionChange(props) })
    this.GetRegionImage(NewValue)
  }

  handleRegionChange(props) {
    /*
    @notice A function to pass the state up to the parent component
    @param props: required for passing the state up
     */
    props.onChange(this.state.RegionID)
  }

  GetRegionImage = (NewValue) => {
    /*
   @notice A function to return the corresponding image based on the region
   @param NewValue: A number corresponding to a region
   @return The relevant flag image
    */
    let NewRegion = UKFlag
    switch (NewValue) {
    case 0:
      NewRegion = UKFlag
      // Change Image
      break
    case 1:
      NewRegion = EUFlag
      break
    case 2:
      NewRegion = USFlag
      break
    case 3:
      NewRegion = WorldFlag
      break
    default:
      NewRegion = UKFlag
    }
    return NewRegion
  }

  GetAverageFootprint() {
    /*
   @notice A function to return the corresponding average footprint based on the region
   @return The average carbon footprint per capita in a given region
    */
    let AverageFootprint = 6.5
    switch (this.state.RegionID) {
    case 0:
      AverageFootprint = 6.5
      // Change Image
      break
    case 1:
      AverageFootprint = 7.0
      break
    case 2:
      AverageFootprint = 16.5
      break
    case 3:
      AverageFootprint = 4.5
      break
    default:
      AverageFootprint = 6.5
    }
    return AverageFootprint
  }

  render() {
    const { displayText } = this.props
    const { RegionName, RegionID } = this.state
    return (
      <div className={styles}>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs>
            <FormControl className="simple-select">
              <Select
                labelId="simple-select"
                labelWidth={100}
                id="simple-select"
                autoWidth
                value={RegionID}
                onChange={event => this.SetRegion(event.target.value, this.props)}
                classes={{
                  selectMenu: 'select-menu',
                  icon: 'select-icon'
                }}
              >
                <MenuItem value={0} className="menu-item"> UK </MenuItem>
                <MenuItem value={1} className="menu-item"> Europe </MenuItem>
                <MenuItem value={2} className="menu-item"> US </MenuItem>
                <MenuItem value={3} className="menu-item"> World </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <img src={this.GetRegionImage(this.state.RegionID)} style={{ maxWidth: 75 }} alt="UK" />
          </Grid>
          { displayText ? (
            <Grid item xs>
              <h3 className="average-footprint">
                {this.GetAverageFootprint()} tCO2e Average {RegionName} footprint
              </h3>
            </Grid>
          ) : (
            <div />
          )}
          { displayText ? (
            <Grid item xs>
              <Card elevation={0}>
                <CardActionArea>
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item xs>
                      <h4 style={{ fontWeight: 600, margin: 0 }}>
                        FAQS
                      </h4>
                    </Grid>
                    <Grid item xs>
                      <ArrowDownwardIcon />
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Card>
            </Grid>
          ) : (
            <div />
          )}
        </Grid>
      </div>
    )
  }
}

RegionSelect.propTypes = {
  displayText: PropTypes.bool.isRequired,
  RegionID: PropTypes.number.isRequired
}

export default RegionSelect
