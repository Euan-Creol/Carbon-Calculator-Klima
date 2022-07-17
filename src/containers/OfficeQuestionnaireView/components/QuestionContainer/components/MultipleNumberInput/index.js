import React, { Component }                   from 'react'
import PropTypes                              from 'prop-types'
import { Grid }                               from '@material-ui/core'

import NumberInput                            from '../NumberInput'
import { styles }                             from './styles.scss'
import LowTravel                              from '../../../../../../assets/images/OfficeQuestionnaireView/Office.png'
import MidTravel                              from '../../../../../../assets/images/OfficeQuestionnaireView/SuvCar.png'
import HighTravel                             from '../../../../../../assets/images/OfficeQuestionnaireView/FlyingAirplane.png'

class MultipleNumberInput extends Component {
  constructor() {
    super()
    this.state = {
      LowTravelEmployee: 0,
      MidTravelEmployee: 0,
      HighTravelEmployee: 0,
      Output: []
    }
  }

  ReturnComponents(InputData, props) {
    /*
     @notice A function to map and return the multiple input options
     @param InputData: Relevant data for populating the multiple input component
     @param props: Required to pass state to parent component
     @return React component containing multiple inputs
      */
    return InputData.map(array => (
      <Grid item xs key={array[0][0]}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
          <Grid item xs>
            <img
              style={{ height: 100 }}
              alt={this.DetermineImage(array[0][0])}
              src={this.DetermineImage(array[0][0])}
            />
          </Grid>
          <Grid item xs>
            <NumberInput
              InputLabel={array[0][0]}
              onChange={footprintAddition =>
                this.UpdateQuestionFootprint(footprintAddition, array[0][0], props)}
            />
          </Grid>
          <Grid item xs>
            <h4 style={{ color: 'white' }}> {array[1]} </h4>
          </Grid>
        </Grid>
      </Grid>
    ))
  }

  DetermineImage = (TierName) => {
    /*
     @notice A function to return the appropriate image
     @param TierName: String used to determine the appropriate image
     @return Relevant option image
      */
    let image = LowTravel
    switch (TierName) {
    default:
      break
    case 'Low-travel Employees':
      image = LowTravel
      break
    case 'Mid-travel Employees':
      image = MidTravel
      break
    case 'High-travel Employees':
      image = HighTravel
      break
    }
    return image
  }

  UpdateQuestionFootprint(footprintAddition, InputType, props) {
    /*
     @notice A function to update the appropriate state upon input change
     @param footprintAddition: Result from the chosen input field
     @param InputType: String used to determine the appropriate state
     @param props: Required to pass state to parent component
      */
    switch (InputType) {
    case 'Low-travel Employees':
      this.setState({
        LowTravelEmployee: footprintAddition,
        Output: [footprintAddition, this.state.MidTravelEmployee, this.state.HighTravelEmployee]
      }, () => { this.handleOutputChange(props) })
      break
    case 'Mid-travel Employees':
      this.setState({
        MidTravelEmployee: footprintAddition,
        Output: [this.state.LowTravelEmployee, footprintAddition, this.state.HighTravelEmployee]
      }, () => { this.handleOutputChange(props) })
      break
    case 'High-travel Employees':
      this.setState({
        HighTravelEmployee: footprintAddition,
        Output: [this.state.LowTravelEmployee, this.state.MidTravelEmployee, footprintAddition]
      }, () => { this.handleOutputChange(props) })
      break
    default:
      break
    }
  }

  handleOutputChange(props) {
    /*
       @notice A function to pass the state up to the parent component
       @param props: required for passing the state up
       */
    props.onChange(this.state.Output)
  }


  render() {
    const { InputData } = this.props
    return (
      <div className={styles}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
          {this.ReturnComponents(InputData, this.props)}
        </Grid>
      </div>
    )
  }
}

MultipleNumberInput.propTypes = {
  InputData: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default MultipleNumberInput

