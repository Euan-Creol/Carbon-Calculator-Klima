import React, { Component }                              from 'react'
import PropTypes                                         from 'prop-types'
import { Grid, ButtonGroup, Button }                         from '@material-ui/core'
import Selection                                         from '../Select'
import { styles }                                        from './styles.scss'

class Counter extends Component {
  constructor() {
    super()
    this.state = {
      QuestionFootprint: 0,

      Domestic: 0,
      Europe: 0,
      Asia: 0,
      NA: 0,
      SA: 0,
      Africa: 0,
      World1k: 0,
      World2k: 0,
      World5k: 0,
      World10k: 0,
      World20k: 0,

      Phone: 0,
      Laptop: 0,
      Desktop: 0,
      Car: 0,

      FleetCar: 0,
      FleetMotorcycle: 0,
      FleetVan: 0,
      FleetTruck: 0,
      CarSelect: 1.8,
      MotorcycleSelect: 1.8,
      VanSelect: 1.8,
      TruckSelect: 1.8
    }
  }

  ReturnCounterComponents(CounterOptions, SelectOptions, props) {
    /*
         @notice A function to map and return the counter options
         @param CounterOptions: Array of data corresponding to the region's counter options
         @param SelectOptions: Array of data corresponding to the region's select options (optional)
         @param props: Required to pass state to parent component
         @return React component of the counter option mapping
          */

    return CounterOptions.map(Array => (
      <div key={Array[0]}>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} style={{ maxHeight: 70 }}>
          <Grid item xs={this.ReturnGridSize(SelectOptions)}>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
              <Grid className="option-text" item xs={12} md={6}>
                <h2 className="option-label">{Array[0]}</h2>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="option-button" item xs>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
              <Grid className="option-button" item xs={6} md={6}>
                <ButtonGroup size="large" variant="outlined" aria-label="counter" className="counter">
                  <Button onClick={() => { this.UpdateCounter(Array, -1, props) }} className="counter-button">
                    -
                  </Button>
                  <Button className="counter-button">
                    {this.DetermineStateName(Array[0])}
                  </Button>
                  <Button onClick={() => { this.UpdateCounter(Array, 1, props) }} className="counter-button">
                    +
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          {this.ReturnSelect(SelectOptions, Array[0], props)}
        </Grid>
      </div>
    ))
  }

  ReturnGridSize = (SelectOptions) => {
    if (SelectOptions === null) {
      return 6
    }
    return 3
  }

  ReturnSelect(SelectOptions, OptionName, props) {
    /*
         @notice A function to return the select component
         @param SelectOptions: Array of data corresponding to the region's select options (optional)
         @param OptionName: String used to update footprint in later function
         @param props: Required to pass state to parent component
         @return React component of the select options
          */
    if (SelectOptions !== null) {
      return (
        <Grid item xs={3}>
          <Selection
            SelectOptions={SelectOptions}
            DefaultValue="Fuel"
            DefaultBool
            onChange={footprintAddition =>
              this.UpdateSelectFootprint(footprintAddition, OptionName, props)}
          />
        </Grid>
      )
    }
    return <div />
  }

  UpdateSelectFootprint(footprintAddition, OptionName, props) {
    /*
        @notice A function to update the state when the select component changes
        @param footprintAddition: Output from the Select component
        @param OptionName: String used to update relevant footprint
        @param props: Required to pass state to parent component
         */
    switch (OptionName) {
    default:
      break
    case 'Car':
      this.setState({
        CarSelect: footprintAddition
      }, () => {
        this.UpdateQuestionFootprint(
          this.state.FleetCar,
          footprintAddition,
          props)
      })
      break
    case 'Motorcycle':
      this.setState({
        MotorcycleSelect: footprintAddition
      }, () => {
        this.UpdateQuestionFootprint(this.state.FleetMotorcycle,
          footprintAddition,
          props)
      })
      break
    case 'Van':
      this.setState({
        VanSelect: footprintAddition
      }, () => {
        this.UpdateQuestionFootprint(
          this.state.FleetVan,
          footprintAddition,
          props)
      })
      break
    case 'Truck':
      this.setState({
        TruckSelect: footprintAddition
      }, () => {
        this.UpdateQuestionFootprint(
          this.state.FleetTruck,
          footprintAddition,
          props)
      })
      break
    }
  }

  DetermineStateName(OptionName) {
    /*
        @notice A function to return the relevant state based on name
        @param OptionName: String used to identify relevant state
        @return Appropriate state
         */
    let stateName = ''
    switch (OptionName) {
    default:
      break
    case 'Domestic':
      stateName = this.state.Domestic
      break
    case 'Europe':
      stateName = this.state.Europe
      break
    case 'Asia':
      stateName = this.state.Asia
      break
    case 'North America':
      stateName = this.state.NA
      break
    case 'South America':
      stateName = this.state.SA
      break
    case 'Africa':
      stateName = this.state.Africa
      break
    case 'Up to 1000km':
      stateName = this.state.World1k
      break
    case 'Up to 2500km':
      stateName = this.state.World2k
      break
    case 'Up to 5000km':
      stateName = this.state.World5k
      break
    case 'Up to 10,000km':
      stateName = this.state.World10k
      break
    case 'More than 10,000km':
      stateName = this.state.World20k
      break
    case 'Mobile Phone':
      stateName = this.state.Phone
      break
    case 'Laptop':
      stateName = this.state.Laptop
      break
    case 'Computer':
      stateName = this.state.Desktop
      break
    case 'Company Car':
      stateName = this.state.Car
      break
    case 'Car':
      stateName = this.state.FleetCar
      break
    case 'Motorcycle':
      stateName = this.state.FleetMotorcycle
      break
    case 'Van':
      stateName = this.state.FleetVan
      break
    case 'Truck':
      stateName = this.state.FleetTruck
      break
    }
    return stateName
  }

  UpdateCounter(Array, Value, props) {
    /*
        @notice A function to update the relevant counter display
        @param Array: Array containing option name and associated footprint
        @param Value: amount to update counter display by
        @param props: Required to pass state to parent component
         */
    const CounterState = this.DetermineStateName(Array[0])
    if (CounterState > 0 || (CounterState === 0 && Value > 0)) {
      switch (Array[0]) {
      default:
        break
      case 'Domestic':
        this.setState({
          Domestic: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'Europe':
        this.setState({
          Europe: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'Asia':
        this.setState({
          Asia: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'North America':
        this.setState({
          NA: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'South America':
        this.setState({
          SA: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'Africa':
        this.setState({
          Africa: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'Up to 1000km':
        this.setState({
          World1k: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'Up to 2500km':
        this.setState({
          World2k: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'Up to 5000km':
        this.setState({
          World5k: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'Up to 10,000km':
        this.setState({
          World10k: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'More than 10,000km':
        this.setState({
          World20k: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'Mobile Phone':
        this.setState({
          Phone: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'Laptop':
        this.setState({
          Laptop: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'Computer':
        this.setState({
          Desktop: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'Company Car':
        this.setState({
          Car: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, 1, props)
        })
        break
      case 'Car':
        this.setState({
          FleetCar: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, this.state.CarSelect, props)
        })
        break
      case 'Motorcycle':
        this.setState({
          FleetMotorcycle: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, this.state.MotorcycleSelect, props)
        })
        break
      case 'Van':
        this.setState({
          FleetVan: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, this.state.VanSelect, props)
        })
        break
      case 'Truck':
        this.setState({
          FleetTruck: CounterState + Value
        }, () => {
          this.UpdateQuestionFootprint(Array[1] * Value, this.state.TruckSelect, props)
        })
        break
      }
    }
  }

  UpdateQuestionFootprint(CounterValue, SelectValue, props) {
    /*
        @notice A function to update the total footprint of this question
        @param CounterValue: Associated value of chosen counter option
        @param SelectValue: Associated value of chosen select option
        @param props: Required to pass state to parent component
         */
    this.setState({
      QuestionFootprint: this.state.QuestionFootprint + (CounterValue * SelectValue)
    }, () => { this.handleCounterChange(props) })
  }

  handleCounterChange(props) {
    /*
      @notice A function to pass the state up to the parent component
      @param props: required for passing the state up
      */
    props.onChange(this.state.QuestionFootprint)
  }

  render() {
    const { CounterOptions, SelectOptions } = this.props
    const CounterComponents = this.ReturnCounterComponents(
      CounterOptions,
      SelectOptions,
      this.props)
    return (
      <div className={styles}>
        {CounterComponents}
      </div>
    )
  }
}

Counter.propTypes = {
  CounterOptions: PropTypes.arrayOf(PropTypes.array).isRequired,
  SelectOptions: PropTypes.arrayOf(PropTypes.array)
}
Counter.defaultProps = {
  SelectOptions: null
}

export default Counter
