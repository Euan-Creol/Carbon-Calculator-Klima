import React, { Component }                   from 'react'
import PropTypes                              from 'prop-types'
import { Grid }                               from '@material-ui/core'
import ApartmentIcon from '@mui/icons-material/Apartment'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import FlightIcon from '@mui/icons-material/Flight'

import NumberInput                            from '../NumberInput'
import { styles }                             from './styles.scss'

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
      <Grid item xs={12} md={4} key={array[0][0]}>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
          <Grid item xs>
            {this.DetermineImage(array[0][0])}
          </Grid>
          <Grid item xs>
            <NumberInput
              className="number-input"
              InputLabel={array[0][0]}
              onChange={footprintAddition =>
                this.UpdateQuestionFootprint(footprintAddition, array[0][0], props)}
            />
          </Grid>
          <Grid item xs>
            <h4 className="input-description"> {array[1]} </h4>
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
    switch (TierName) {
    default:
      return (<h2>ICON MISSING</h2>)
    case 'Low-travel Employees':
      return (<ApartmentIcon fontSize="large" className="input-image" />)
    case 'Mid-travel Employees':
      return (<DirectionsCarIcon fontSize="large" className="input-image" />)
    case 'High-travel Employees':
      return (<FlightIcon fontSize="large" className="input-image" />)
    }
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
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {this.ReturnComponents(InputData, this.props)}
        </Grid>
      </div>
    )
  }
}

MultipleNumberInput.propTypes = {
  InputData: PropTypes.arrayOf(PropTypes.array).isRequired
}

export default MultipleNumberInput

